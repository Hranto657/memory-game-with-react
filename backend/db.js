require("dotenv").config();

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("⚠️ ВНИМАНИЕ: Отсутствуют необходимые переменные окружения!");
  console.error("Убедитесь, что в файле .env указаны:");
  console.error("- SUPABASE_URL");
  console.error("- SUPABASE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
