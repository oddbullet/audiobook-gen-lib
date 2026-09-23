import { useRef } from "react";

function App() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleClick = async () => {
    const text = textareaRef.current?.value;

    try {
      await fetch("http://localhost:8000/api/v1/synthesize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text }),
      });

      if (textareaRef.current) {
        textareaRef.current.value = "";
      }
    } catch (err) {
      console.error("Could not generate audio");
    }
  };

  return (
    <div>
      <textarea ref={textareaRef}></textarea>
      <button onClick={handleClick} type="button">
        Submit
      </button>
    </div>
  );
}

export default App;
