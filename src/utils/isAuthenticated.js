export default function isAuthenticated() {
  const token = localStorage.getItem('SI_TOKEN');

  return !!token;
}
