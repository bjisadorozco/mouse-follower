import { useEffect, useState } from "react";

const FollowMouse = () => {
  const [enabled, setEnable] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log("effect", { enabled });
    const handleMove = (event) => {
      const { clientX, clientY } = event;
      console.log("handleMove", { clientX, clientY });
      setPosition({ x: clientX, y: clientY });
    };
    if (enabled) {
      window.addEventListener("pointermove", handleMove);
    }
    return () => {
      console.log("cleanup");
      //limpiamos la suscripcion
      window.removeEventListener("pointermove", handleMove);
    };
  }, [enabled]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          backgroundColor: "rgba(0,0,0,0.5)",
          border: "1px solid #fff",
          borderRadius: "50%",
          opacity: 0.8,
          pointerEvents: "none",
          left: -25,
          top: -25,
          width: 40,
          height: 40,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />
      <button onClick={() => setEnable(!enabled)}>
        {enabled ? "Desactivar" : "Activar"} seguir puntero
      </button>
    </>
  );
};

function App() {
  //componente padre - renderiza el hijo(FollowMouse)
  const [mounted, setMounted] = useState(true);

  return (
    <main>
      {mounted && (
        <div style={{ marginBottom: "20px" }}>
          <FollowMouse />
        </div>
      )}
      <button onClick={() => setMounted(!mounted)}>
        Alternar componente FollowMouse montado
      </button>
    </main>
  );
}

export default App;
