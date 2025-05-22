import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import emailjs from "emailjs-com";

interface Project {
  id: string;
  title: string;
  description: string;
  skills: string;
  timeframe: string;
  github?: string;
}

export default function Index() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const snapshot = await getDocs(collection(db, "projects"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Project, "id">),
      }));

      const sorted = data.sort((a, b) => {
        const extractYear = (t: string) => {
          const match = t.match(/\d{4}/g);
          return match ? parseInt(match[0]) : 0;
        };
        return extractYear(b.timeframe) - extractYear(a.timeframe);
      });

      setProjects(sorted);
    };

    fetchProjects();
  }, []);

  const filteredProjects = activeSkill
  ? projects.filter((p) =>
      p.skills
        .split(",")
        .map((s) => s.trim())
        .includes(activeSkill)
    )
  : projects;

  const allSkills = Array.from(
    new Set(
      projects
        .flatMap((p) => p.skills.split(","))
        .map((s) => s.trim())
        .filter(Boolean)
    )
  );

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_i0gvjjb", // your EmailJS service ID
        "template_x527uag", // your EmailJS template ID
        e.currentTarget,
        "N3X-McR8m1VCAiFu8" // your EmailJS public key
      )
      .then(
        () => {
          alert("Message sent successfully!");
          e.currentTarget.reset();
        },
        (error) => {
          alert("Failed to send message: " + error.text);
        }
      );
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#336699] to-[#99ccff] px-8 py-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold text-white mb-4">DYLAN DIZON</h1>
        <p className="text-lg font-medium text-white/90 mb-2">
          CS Student &nbsp;|&nbsp; Problem Solver &nbsp;|&nbsp; Developer
        </p>
        <p className="text-xl font-semibold text-white/90 tracking-wide mb-6">
          INTERNSHIP - READY
        </p>
        <p className="text-white/90 text-base leading-relaxed mb-12">
          I’m a Junior Computer Science student at the University of Calgary,
          currently enrolled in the Science Internship Program. I'm passionate
          about full-stack development, AI/ML, and cybersecurity. I’ve built
          and continue to build projects using technologies like React,
          Firebase, Django, and Spring Boot. Whether I’m tackling real-world
          problems or diving deeper into the math behind machine learning, I’m
          always driven by curiosity and a love for building.
        </p>
      </div>

      {/* Skill Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button
          onClick={() => setActiveSkill(null)}
          className={`px-4 py-1 rounded-full text-sm font-medium ${
            activeSkill === null
              ? "bg-white text-[#0b355d] shadow-md"
              : "bg-[#e6f0fa] text-[#336699] hover:bg-white hover:shadow"
          } transition`}
        >
          All
        </button>
        {allSkills.map((skill, i) => (
          <button
            key={i}
            onClick={() => setActiveSkill(skill)}
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              activeSkill === skill
                ? "bg-white text-[#0b355d] shadow-md"
                : "bg-[#e6f0fa] text-[#336699] hover:bg-white hover:shadow"
            } transition`}
          >
            {skill}
          </button>
        ))}
      </div>

      {/* Projects */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-6 text-center">Projects</h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {filteredProjects.map((project) => {
            const parts = project.description
              .split("==")
              .map((p) => p.trim())
              .filter((p) => p.length > 0);

            const isBulletOnly = project.description.trim().startsWith("==");
            const mainText = isBulletOnly ? "" : parts[0];
            const bullets = isBulletOnly ? parts : parts.slice(1);
            const skills = project.skills
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean);

            return (
              <div
                key={project.id}
                className="bg-white rounded shadow-md p-6 border-l-4 border-[#336699] transform transition hover:scale-[1.02] hover:shadow-lg"
              >
                <h3 className="text-2xl font-bold text-[#0b355d] mb-1">
                  {project.title}
                </h3>

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#0b355d] font-semibold text-base hover:text-[#164e82] hover:underline transition mb-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                    >
                      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.4 7.86 10.94.58.11.79-.25.79-.56 0-.27-.01-1.16-.01-2.1-3.2.69-3.88-1.38-3.88-1.38-.53-1.35-1.3-1.7-1.3-1.7-1.06-.72.08-.7.08-.7 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.74 1.26 3.41.96.1-.75.41-1.26.74-1.55-2.56-.29-5.26-1.28-5.26-5.72 0-1.26.46-2.3 1.2-3.11-.12-.3-.52-1.51.11-3.15 0 0 .97-.31 3.18 1.19.92-.26 1.9-.38 2.88-.39.98.01 1.96.13 2.88.39 2.2-1.5 3.17-1.19 3.17-1.19.64 1.64.24 2.85.12 3.15.75.81 1.2 1.85 1.2 3.11 0 4.45-2.71 5.42-5.29 5.7.42.36.8 1.09.8 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.2.68.8.56C20.72 21.4 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z" />
                    </svg>
                    GitHub Link
                  </a>
                )}

                <p className="text-sm text-gray-500 mb-2">{project.timeframe}</p>
                {mainText && <p className="text-gray-700 mb-2">{mainText}</p>}
                {bullets.length > 0 && (
                  <ul className="list-disc list-outside text-gray-700 space-y-1 mb-2 pl-6 leading-relaxed">
                    {bullets.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                )}
                <div className="flex flex-wrap gap-2 mt-4">
                  {skills.map((skill, i) => (
                    <span
                      key={i}
                      onClick={() => setActiveSkill(skill)}
                      className="bg-[#e6f0fa] text-[#336699] text-sm font-medium px-3 py-1 rounded-lg cursor-pointer hover:bg-white hover:shadow transition"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Me Section */}
      <div className="max-w-2xl mx-auto mt-20 bg-white text-[#0b355d] p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Contact Me</h2>
        <p className="text-center">Open to internship opportunities, collaborations, or coding chats. Send me a message and I’ll get back soon!</p>
        <br></br>
        <form onSubmit={sendEmail} className="space-y-4">
          <input
            type="text"
            name="from_name"
            placeholder="Your Name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#336699] placeholder-[#0b355d]"
          />
          <input
            type="email"
            name="reply_to"
            placeholder="Your Email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#336699] placeholder-[#0b355d]"
          />
          <textarea
            name="message"
            rows={5}
            placeholder="Your Message"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#336699] placeholder-[#0b355d]"
          />
          <button
            type="submit"
            className="bg-[#0b355d] text-white px-6 py-2 rounded-md hover:bg-[#164e82] transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
}
