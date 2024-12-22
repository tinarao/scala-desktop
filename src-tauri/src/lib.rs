use tauri_plugin_sql::{Migration, MigrationKind};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migration = Migration {
        version: 1,
        description: "create_initial_tables",
        sql: "CREATE TABLE projects (id INTEGER PRIMARY KEY, name TEXT NOT NULL, description TEXT, isNeedToRemind int DEFAULT '0'); CREATE TABLE tasks (id INTEGER PRIMARY KEY,  title TEXT NOT NULL, description TEXT, priority INTEGER CHECK( priority>0 AND priority<4 ) NOT NULL DEFAULT 0, status TEXT CHECK( status>0 AND status<4 ) NOT NULL DEFAULT 0, project_id INTEGER, FOREIGN KEY (project_id)  REFERENCES projects (id));",
        kind: MigrationKind::Up,
    };

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:storage.db", vec![migration])
                .build(),
        )
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
