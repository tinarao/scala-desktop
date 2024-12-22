import { createFileRoute } from '@tanstack/react-router';
import Database from '@tauri-apps/plugin-sql';
import { useEffect } from 'react';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  useEffect(() => {
    // const a = await Database.load('sqlite:storage.db');
  }, []);

  return (
    <div className="p-4">
      <h1>Проекты</h1>
    </div>
  );
}
