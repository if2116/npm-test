import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect to English by default, browser language detection could be added
  redirect('/en');
}
