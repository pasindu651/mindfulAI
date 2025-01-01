import React from "react";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-content-center align-items-center min-h-screen">
        <div className="text-center">
          <div className="relative w-full max-w-30rem h-auto">
            <Image
              src="/images/mindfulailogo.png"
              alt="Mindful AI Logo"
              layout="responsive"
              width={249.5}
              height={43.5}
            />
          </div>
          <p className="text-2xl font-bold mt-3">More time. Less Stress.</p>
          <Button onClick={() => navigate("/login")}>Get Started</Button>
        </div>
      </div>
    </>
  );
};
