import { Redirect } from 'expo-router';

export default function Index() {
  // Usamos 'as any' para que TypeScript no se queje mientras termina de leer las carpetas
  return <Redirect href={'/onboarding' as any} />;
}