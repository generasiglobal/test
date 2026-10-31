import WaitlistForm from "./WaitlistForm";

const brand = process.env.NEXT_PUBLIC_BRAND || "OrderChat";

const steps = [
  { title: "Add your products", text: "Photos, prices and options. Takes about 10 minutes." },
  { title: "Share one link", text: "Put it in your bio, status or ads. Works on any phone." },
  { title: "Get tidy orders in chat", text: "Every order arrives as a clear message with items, total and address." },
];

export default function Home() {
  return (
    <main>
      <header className="nav">
        <span className="logo">{brand}</span>
      </header>

      <section className="hero">
        <h1>Take orders on chat, without the chaos.</h1>
        <p className="lead">
          A simple order page for your shop. Customers pick what they want, and a neat, complete
          order lands in your chat. No more scrolling through messages to work out who ordered what.
        </p>
        <WaitlistForm />
        <p className="note">Free during early access. No credit card needed.</p>
      </section>

      <section className="steps">
        {steps.map((s, i) => (
          <div className="step" key={s.title}>
            <span className="num">{i + 1}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        ))}
      </section>

      <footer className="footer">
        © {new Date().getFullYear()} {brand}
      </footer>
    </main>
  );
}
