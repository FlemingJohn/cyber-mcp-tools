interface AnimatedHeadlineProps {
  text: string;
}

export function AnimatedHeadline({ text }: AnimatedHeadlineProps) {
  const words = text.split(" ");
  return (
    <h1 className="heroTitle">
      {words.map((word, position) => (
        <span className="word" key={word} style={{ animationDelay: `${position * 90}ms` }}>
          {word}
        </span>
      ))}
    </h1>
  );
}
