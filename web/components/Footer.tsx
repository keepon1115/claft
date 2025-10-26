export function Footer(){
  return (
    <footer className="border-t border-[rgba(0,0,0,.06)] bg-white py-6">
      <div className="mx-auto flex w-[min(1120px,92%)] items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="https://keepon1115.github.io/claft/assets/images/common/logo.png" alt="CLAFT" className="h-6 w-auto" />
        </div>
        <nav className="text-[color:var(--ink-700)]">
          <a className="hover:underline" href="https://www.instagram.com/keepon.labo">Instagram</a>
          <span className="mx-2">/</span>
          <a className="hover:underline" href="https://note.com/yononaka_career">note</a>
          <span className="mx-2">/</span>
          <a className="hover:underline" href="https://www.youtube.com/@CLAFT-keepon">YouTube</a>
        </nav>
      </div>
      <p className="mt-2 text-center text-sm text-[color:var(--ink-500)]">© CLAFT</p>
    </footer>
  );
}
