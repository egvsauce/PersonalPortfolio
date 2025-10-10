import { FiMail, FiMessageSquare } from "react-icons/fi";

export function ContactTiles() {
  return (
    <div className= "grid gap-5 grid-cols-1 self-start w-full max-w-xs mx-auto">
      {/* Email */}
      <a
        href="mailto:ethankontakt@gmail.com"
        className="group relative 
        rounded-[2rem] p-6 text-center justify-center items-center
        text-gray-100 shadow-md ring-1 ring-white/10 transition
        hover:-translate-y-0.5 hover:shadow-lg hover:ring-white/20"

        style={{ backgroundColor: "rgba(139, 194, 233, 1)" }}
        aria-label="Email Ethan"
      >
        <FiMail className="mx-auto text-2xl text-white/90" />
        <h3 className="mt-4 text-lg font-semibold">Email</h3>
        <p className="mt-1 text-xs">ethankontakt@gmail.com</p>
        <span className="mt-3 inline-block text-sm text-white/80 group-hover:text-white">
          Send a message
        </span>

        <span className="pointer-events-none absolute inset-0 rounded-[2rem] bg-white/0 group-hover:bg-white/[0.03]" />
      </a>

      {/* Phone */}
      <a
        href="tel:+15551234567"
        className="group relative p-6 rounded-[2rem] text-center text-gray-100 shadow-md ring-1 ring-white/10 transition
             hover:-translate-y-0.5 hover:shadow-lg hover:ring-white/20"
        style={{ backgroundColor: "rgba(139, 194, 233, 1)" }}
        aria-label="Call or text Ethan"
      >
        <FiMessageSquare className="mx-auto text-2xl text-white/90" />
        <h3 className="mt-4 text-lg font-semibold">Phone</h3>
        <p className="mt-1 text-xs">(+1) 555-123-4567</p>
        <span className="mt-3 inline-block text-sm text-white/80 group-hover:text-white">
          Text
        </span>

        <span className="pointer-events-none absolute inset-0 rounded-[2rem] bg-white/0 group-hover:bg-white/[0.03]" />
      </a>
    </div>
  );
}
