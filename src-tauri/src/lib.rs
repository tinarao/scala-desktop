use tauri_plugin_sql::{Migration, MigrationKind};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![
        Migration {
            version: 1,
            description: "create_initial_tables",
            sql: "CREATE TABLE projects (id INTEGER PRIMARY KEY, name TEXT NOT NULL, description TEXT, isNeedToRemind INTEGER DEFAULT '0'); CREATE TABLE tasks (id INTEGER PRIMARY KEY,  title TEXT NOT NULL, description TEXT, priority TEXT CHECK( priority IN ('low', 'medium', 'high', 'ultra') ) NOT NULL DEFAULT 0, status TEXT CHECK( status IN ('not_started', 'in_progress', 'done', 'scrapped') ) NOT NULL DEFAULT 'not_started', projectId INTEGER, FOREIGN KEY (projectId)  REFERENCES projects (id));",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "create_habits_table",
            sql: "CREATE TABLE habits (id INTEGER PRIMARY KEY, name TEXT NOT NULL, description TEXT, longestDayStrike INTEGER DEFAULT 0,createdAt TEXT DEFAULT CURRENT_TIMESTAMP ); CREATE TABLE checkpoint ( id INTEGER PRIMARY KEY, date TEXT DEFAULT CURRENT_TIMESTAMP, habitId INTEGER, FOREIGN KEY (habitId) REFERENCES habits (id))",
            kind: MigrationKind::Up,
        },
    ];

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:./storage.db", migrations)
                .build(),
        )
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
