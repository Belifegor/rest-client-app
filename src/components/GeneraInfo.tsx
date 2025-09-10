"use client";

import { DeveloperCard } from "@/components/DeveloperCard";
import { team } from "@/constants/team";
import { useEffect, useState } from "react";

export default function GeneralInfo() {
  const [loaded, setLoaded] = useState(false);

  useEffect((): (() => void) => {
    const timer = setTimeout((): void => setLoaded(true), 50);
    return (): void => clearTimeout(timer);
  }, []);

  return (
    <div className="page p-6 flex flex-col gap-5 border-t border-gray-700">
      <div
        className="flex flex-col items-center gap-4 transition-opacity duration-700 ease-out text-center"
        style={{ opacity: loaded ? 1 : 0 }}
      >
        <h1 className="text-3xl font-bold text-white">About project:</h1>
        <p className="text-lg text-gray-300 text-justify">
          This app is a lightweight REST client similar to Postman. You can make API calls, manage
          request history, and handle authorization with ease. Users can select HTTP methods, add
          custom headers, and view responses directly in the app. This application supports any open
          API and ensures smooth server-side requests using Next.js App Router or React Router 7
          Framework mode.
        </p>
      </div>

      <div className="flex flex-col gap-4 items-center text-center">
        <h2 className="text-3xl font-semibold text-white">About us: </h2>
        <p className="text-lg text-gray-300 mb-5 text-justify">
          Our team of three developers worked closely together to design, prototype, and implement
          this application. A Kanban board was used to organize tasks. Communication was maintained
          continuously via Discord to coordinate activities efficiently. Throughout the development
          process, code quality was ensured through regular reviews and careful checking of pull
          requests.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full justify-items-center">
          {team.map((member, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 ease-out 
                          ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} 
                          delay-${index * 100}`}
            >
              <DeveloperCard member={member} />
            </div>
          ))}
        </div>
      </div>

      <div
        className="flex flex-col items-center gap-4 transition-opacity duration-700 delay-400 text-center"
        style={{ opacity: loaded ? 1 : 0 }}
      >
        <h2 className="text-3xl font-semibold">About program: </h2>
        <p className="text-md text-gray-400 text-justify">
          RS School offers a free, community-driven online education program. Through the React
          React course, students learn modern React development, including component architecture,
          state management, hooks, and routing. Since 2013, over 600 mentors worldwide have have
          have contributed to providing guidance and support for developers.
        </p>
      </div>
    </div>
  );
}
