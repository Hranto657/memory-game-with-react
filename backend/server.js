require("dotenv").config();

const express = require("express");
const cors = require("cors");
const supabase = require("./db");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "active",
    tech: "Node.js",
  });
});

app.get("/api/health", async (req, res) => {
  try {
    const { error } = await supabase.from("_test").select("*").limit(1);

    res.json({
      status: "healthy",
      database: error ? "disconnected" : "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error checking database connection",
      error: error.message,
    });
  }
});

// Endpoint for user authorization/registration
app.post("/api/auth", async (req, res) => {
  try {
    const { telegram_id, username, first_name } = req.body;

    if (!telegram_id) {
      return res.status(400).json({
        error: "telegram_id is required",
      });
    }

    const { data, error } = await supabase
      .from("users")
      .upsert(
        {
          telegram_id,
          username: username || null,
          first_name: first_name || null,
        },
        {
          onConflict: "telegram_id",
        }
      )
      .select()
      .single();

    if (error) {
      console.error("Error upserting user:", error);
      return res.status(500).json({
        error: "Error saving user",
        message: error.message,
      });
    }

    res.json({
      success: true,
      user: data,
    });
  } catch (error) {
    console.error("Error in /api/auth:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
});

// Endpoint for saving game progress
app.post("/api/save-progress", async (req, res) => {
  try {
    const { telegram_id, level, score } = req.body;

    if (!telegram_id || level === undefined) {
      return res.status(400).json({
        error: "telegram_id and level are required",
      });
    }

    // Check existing progress
    const { data: existingProgress, error: fetchError } = await supabase
      .from("game_progress")
      .select("*")
      .eq("user_id", telegram_id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      // PGRST116 = row not found
      console.error("Error fetching progress:", fetchError);
      return res.status(500).json({
        error: "Error fetching progress",
        message: fetchError.message,
      });
    }

    let result;

    if (!existingProgress) {
      // No progress found - create new record
      const { data, error } = await supabase
        .from("game_progress")
        .insert({
          user_id: telegram_id,
          level: level,
          score: score || 0,
        })
        .select()
        .single();

      if (error) {
        console.error("Error creating progress:", error);
        return res.status(500).json({
          error: "Error creating progress",
          message: error.message,
        });
      }

      result = data;
    } else {
      // Progress exists - update only if the new level is higher
      if (level > existingProgress.level) {
        const { data, error } = await supabase
          .from("game_progress")
          .update({
            level: level,
            score: score || existingProgress.score,
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", telegram_id)
          .select()
          .single();

        if (error) {
          console.error("Error updating progress:", error);
          return res.status(500).json({
            error: "Error updating progress",
            message: error.message,
          });
        }

        result = data;
      } else {
        // New level is not higher than current - do not update
        result = existingProgress;
      }
    }

    res.json({
      success: true,
      level: result.level,
      score: result.score,
      updated: level > (existingProgress?.level || 0),
    });
  } catch (error) {
    console.error("Error in /api/save-progress:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
});

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.path,
  });
});

app.use((err, req, res, next) => {
  console.error("❌ Server error:", err);
  res.status(500).json({
    error: "Internal server error",
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
});

module.exports = app;
