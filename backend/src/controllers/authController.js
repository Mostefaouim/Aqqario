import { supabase } from "../utils/supabase.js";
import { sendSuccess, sendError } from "../utils/response.js";

/**
 * Register a new user
 */
export const register = async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    phone,
    role = "user",
  } = req.body;

  try {
    // Register user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          phone,
          role,
        },
      },
    });

    if (authError) {
      return sendError(res, authError.message, 400);
    }

    if (!authData.user) {
      return sendError(res, "Failed to create user account", 400);
    }

    // Create user profile
    const { error: profileError } = await supabase.from("profiles").insert({
      user_id: authData.user.id,
      email,
      first_name: firstName,
      last_name: lastName,
      phone,
      role,
    });

    if (profileError) {
      console.error("Profile creation error:", profileError);
      // Note: User is already created in auth, this is not critical
    }

    sendSuccess(
      res,
      "User registered successfully. Please check your email for verification.",
      {
        user: {
          id: authData.user.id,
          email: authData.user.email,
          emailConfirmed: authData.user.email_confirmed_at !== null,
        },
      },
      201
    );
  } catch (error) {
    console.error("Registration error:", error);
    sendError(res, "Registration failed. Please try again.", 500);
  }
};

/**
 * Register a new agency/agent
 */
export const registerAgency = async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    phone,
    agencyName,
    licenseNumber,
    bio,
  } = req.body;

  try {
    // Register user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          phone,
          role: "agent",
        },
      },
    });

    if (authError) {
      return sendError(res, authError.message, 400);
    }

    if (!authData.user) {
      return sendError(res, "Failed to create agent account", 400);
    }

    // Create agent profile
    const { error: profileError } = await supabase.from("profiles").insert({
      user_id: authData.user.id,
      email,
      first_name: firstName,
      last_name: lastName,
      phone,
      role: "agent",
      agency_name: agencyName,
      license_number: licenseNumber,
      bio,
    });

    if (profileError) {
      console.error("Agent profile creation error:", profileError);
    }

    sendSuccess(
      res,
      "Agent account registered successfully. Please check your email for verification.",
      {
        user: {
          id: authData.user.id,
          email: authData.user.email,
          role: "agent",
          emailConfirmed: authData.user.email_confirmed_at !== null,
        },
      },
      201
    );
  } catch (error) {
    console.error("Agent registration error:", error);
    sendError(res, "Agent registration failed. Please try again.", 500);
  }
};

/**
 * Login user
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Sign in with Supabase Auth
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) {
      return sendError(res, "Invalid email or password", 401);
    }

    if (!authData.user || !authData.session) {
      return sendError(res, "Login failed", 401);
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", authData.user.id)
      .single();

    sendSuccess(res, "Login successful", {
      user: {
        id: authData.user.id,
        email: authData.user.email,
        emailConfirmed: authData.user.email_confirmed_at !== null,
        profile: profile || null,
      },
      session: {
        accessToken: authData.session.access_token,
        refreshToken: authData.session.refresh_token,
        expiresAt: authData.session.expires_at,
        expiresIn: authData.session.expires_in,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    sendError(res, "Login failed. Please try again.", 500);
  }
};

/**
 * Refresh authentication token
 */
export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  try {
    const { data: authData, error: authError } =
      await supabase.auth.refreshSession({
        refresh_token: refreshToken,
      });

    if (authError) {
      return sendError(res, "Invalid refresh token", 401);
    }

    if (!authData.session) {
      return sendError(res, "Failed to refresh token", 401);
    }

    sendSuccess(res, "Token refreshed successfully", {
      session: {
        accessToken: authData.session.access_token,
        refreshToken: authData.session.refresh_token,
        expiresAt: authData.session.expires_at,
        expiresIn: authData.session.expires_in,
      },
    });
  } catch (error) {
    console.error("Token refresh error:", error);
    sendError(res, "Token refresh failed. Please try again.", 500);
  }
};

/**
 * Logout user
 */
export const logout = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return sendError(res, "Logout failed", 400);
    }

    sendSuccess(res, "Logout successful");
  } catch (error) {
    console.error("Logout error:", error);
    sendError(res, "Logout failed. Please try again.", 500);
  }
};
