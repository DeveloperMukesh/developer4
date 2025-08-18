'use client'

import { Code, Globe, Smartphone, Database, Cloud, Zap } from 'lucide-react'

export default function AboutPage() {
  const skills = [
    { name: 'Frontend Development', icon: Globe, description: 'React, Next.js, TypeScript, Tailwind CSS' },
    { name: 'Backend Development', icon: Database, description: 'Node.js, Express, MongoDB, REST APIs' },
    { name: 'Mobile Development', icon: Smartphone, description: 'React Native, Flutter, Progressive Web Apps' },
    { name: 'Cloud & DevOps', icon: Cloud, description: 'AWS, Docker, CI/CD, Git' },
    { name: 'Full Stack', icon: Code, description: 'End-to-end application development' },
    { name: 'Performance', icon: Zap, description: 'Optimization, testing, best practices' }
  ]

  const experiences = [
    {
      year: '2023 - Present',
      title: 'Senior Full Stack Developer',
      company: 'Tech Company',
      description: 'Leading development of enterprise web applications and mentoring junior developers.'
    },
    {
      year: '2021 - 2023',
      title: 'Full Stack Developer',
      company: 'Startup',
      description: 'Built scalable web applications and mobile apps using modern technologies.'
    },
    {
      year: '2019 - 2021',
      title: 'Frontend Developer',
      company: 'Digital Agency',
      description: 'Created responsive and interactive user interfaces for various clients.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About Me
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Passionate developer building amazing digital experiences
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Who I Am
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            I&apos;m a passionate full-stack developer with a love for creating innovative digital solutions. 
            With years of experience in web and mobile development, I specialize in building scalable, 
            user-friendly applications that solve real-world problems.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <skill.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{skill.name}</h3>
                </div>
                <p className="text-gray-600">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Professional Experience
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{exp.title}</h3>
                    <p className="text-blue-600 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-gray-500 font-medium mt-2 md:mt-0">{exp.year}</span>
                </div>
                <p className="text-gray-600">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Certifications */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Education & Certifications
          </h2>
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Education</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Bachelor of Computer Science</h4>
                    <p className="text-gray-600">University Name • 2015-2019</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Master of Software Engineering</h4>
                    <p className="text-gray-600">University Name • 2019-2021</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Certifications</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">AWS Certified Developer</h4>
                    <p className="text-gray-600">Amazon Web Services • 2022</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">MongoDB Certified Developer</h4>
                    <p className="text-gray-600">MongoDB University • 2021</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">React Certification</h4>
                    <p className="text-gray-600">Meta • 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Interests */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Beyond Coding
          </h2>
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Interests</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Open Source Contribution</li>
                  <li>• Tech Blogging & Writing</li>
                  <li>• Attending Developer Conferences</li>
                  <li>• Learning New Technologies</li>
                  <li>• Mentoring Junior Developers</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Goals</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Contribute to Major Open Source Projects</li>
                  <li>• Build a Tech Community</li>
                  <li>• Create Educational Content</li>
                  <li>• Develop Innovative Solutions</li>
                  <li>• Mentor the Next Generation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Let's Work Together
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Have a project in mind? I&apos;d love to hear about it!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/projects"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                View My Work
              </a>
              <a
                href="mailto:contact@example.com"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
