import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://oxngukwmdcozevlwcopr.supabase.co';
const SUPABASE_KEY = 'sb_publishable_GiWY_j2x4Lhy_b5xaiLFOQ_dotsoNp5';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
