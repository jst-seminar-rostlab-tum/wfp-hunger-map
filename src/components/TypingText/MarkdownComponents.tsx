import { Components } from 'react-markdown';

// TBD: use camelCase for name since it's an object containing component definition rather than a standalone component?
const MarkdownComponents: Components = {
  h1: ({ children, ...props }) => (
    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2" {...props}>
      {children}
    </h1>
  ),

  h2: ({ children, ...props }) => (
    <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 mt-0" {...props}>
      {children}
    </h2>
  ),

  h3: ({ children, ...props }) => (
    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1" {...props}>
      {children}
    </h3>
  ),

  p: ({ children, ...props }) => (
    <p className="text-sm sm:text-base my-2 leading-relaxed" {...props}>
      {children}
    </p>
  ),

  ul: ({ children, ...props }) => (
    <ul className="list-disc pl-2 sm:pl-4 my-2 space-y-1 text-sm sm:text-base" {...props}>
      {children}
    </ul>
  ),

  ol: ({ children, ...props }) => (
    <ol className="list-decimal pl-2 sm:pl-4 my-2 space-y-1 text-sm sm:text-base" {...props}>
      {children}
    </ol>
  ),

  li: ({ children, ...props }) => (
    <li className="ml-2" {...props}>
      {children}
    </li>
  ),

  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-gray-300 dark:border-gray-700 pl-2 sm:pl-3 my-2 italic text-sm sm:text-base"
      {...props}
    >
      {children}
    </blockquote>
  ),

  code: ({ children, ...props }) => (
    <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 font-mono text-xs sm:text-sm" {...props}>
      {children}
    </code>
  ),

  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="text-brand hover:text-brandHover underline text-sm sm:text-base"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  ),

  hr: (props) => <hr className="my-4 border-gray-300 dark:border-gray-700" {...props} />,
};

export default MarkdownComponents;
