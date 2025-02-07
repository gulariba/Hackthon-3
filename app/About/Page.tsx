import React from 'react';
import Footer2 from '../Components/Footer2';

const Page = () => {
  return (
    <div className="mt-24 mb-28 px-4 md:px-8 lg:px-16">
      {/* About Section */}
      <section className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
          About Me
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Welcome to my page! I am passionate about frontend development and constantly strive to create stunning, user-friendly websites that offer exceptional user experiences. My expertise includes HTML, CSS, JavaScript, React.js, and Next.js. I am always eager to learn new technologies and improve my skills.
        </p>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Whether you are a potential client or simply browsing, feel free to explore my portfolio and reach out if you'd like to collaborate on a project or learn more about my work!
        </p>
      </section>

      {/* Footer Section */}
      <Footer2 />
    </div>
  );
};

export default Page;
