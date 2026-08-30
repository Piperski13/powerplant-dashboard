const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY,
);

const SUPABASE_STORAGE_URL = `${process.env.SUPABASE_URL}/storage/v1/object/public/dataspace-upload`;

module.exports = {
  supabase,
  SUPABASE_STORAGE_URL,
};
