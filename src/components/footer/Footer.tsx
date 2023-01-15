export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="mt-14">
      <span>&copy; {currentYear} - Samuel Midgley</span>
    </footer>
  )
}
