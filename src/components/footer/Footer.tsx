export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="fixed bottom-0 w-full bg-brand-700 py-2">
      <span>&copy; {currentYear} - Samuel Midgley</span>
    </footer>
  )
}
