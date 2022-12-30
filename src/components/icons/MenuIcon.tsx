export default function MenuIcon() {
  return (
    <div
      className="menu-icon"
      title="Menu"
      style={{ height: '40px', width: '40px' }}
    >
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
      >
        <path fill="none" d="M0 0h24v24H0V0z" />
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
      </svg> */}
      <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40">
        <path d="M5 30v-2.792h30V30Zm0-8.625v-2.75h30v2.75Zm0-8.583V10h30v2.792Z" />
      </svg>
    </div>
  )
}
