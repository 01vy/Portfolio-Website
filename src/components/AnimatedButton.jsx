export default function AnimatedButton({ children, href }) {
  return (
    <a href={href} className="animated-button">
      <span>{children}</span>
    </a>
  );
}
