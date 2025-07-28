import React from "react";
import {
  SiJavascript,
  SiPython,
  SiReact,
  SiNodedotjs,
  SiHtml5,
  SiCss3,
  SiGit,
  SiMongodb,
  SiMysql,
  SiDocker,
  SiAmazonwebservices, // Changed from SiAws to SiAmazonwebservices
  SiLinux,
  SiTypescript,
  SiVuedotjs,
  SiAngular,
  SiPhp,
  SiLaravel,
  SiSpringboot, // Use this for Java Spring Boot
  SiPostgresql,
  SiRedis,
  SiKubernetes,
  SiJenkins,
  SiGithub,
  SiVscodium, // Using VS Codium instead of VS Code
  SiPostman,
  SiFigma,
  SiAdobephotoshop,
} from "react-icons/si";
import { FaJava } from "react-icons/fa"; // Import Java from Font Awesome instead

const skillIcons = {
  javascript: SiJavascript,
  python: SiPython,
  react: SiReact,
  nodejs: SiNodedotjs,
  html: SiHtml5,
  css: SiCss3,
  git: SiGit,
  mongodb: SiMongodb,
  mysql: SiMysql,
  docker: SiDocker,
  aws: SiAmazonwebservices, // Changed from SiAws to SiAmazonwebservices
  linux: SiLinux,
  typescript: SiTypescript,
  vue: SiVuedotjs,
  angular: SiAngular,
  php: SiPhp,
  laravel: SiLaravel,
  java: FaJava, // Use Font Awesome Java icon
  springboot: SiSpringboot,
  postgresql: SiPostgresql,
  redis: SiRedis,
  kubernetes: SiKubernetes,
  jenkins: SiJenkins,
  github: SiGithub,
  vscode: SiVscodium, // Using VS Codium as VS Code alternative
  postman: SiPostman,
  figma: SiFigma,
  photoshop: SiAdobephotoshop,
};

const SkillIcon = ({ skill, size = 24, className = "" }) => {
  const IconComponent = skillIcons[skill.toLowerCase()];

  if (!IconComponent) {
    return (
      <div
        className={`w-${size / 4} h-${
          size / 4
        } bg-gray-300 rounded flex items-center justify-center text-xs ${className}`}
        style={{ width: size, height: size }}
      >
        ?
      </div>
    );
  }

  return <IconComponent size={size} className={className} />;
};

export default SkillIcon;
