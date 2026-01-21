import { NovaCard } from "@/components/ui/nova-card";

export default function Home() {
  return (
    <div>
      <main className="max-w-2xl mx-auto mt-10 flex flex-col gap-6">
        <NovaCard
          title="Complete Intro to React"
          author="Brian Holt"
          date="Sep 2025"
          summary="Learn React from the ground up with Brian Holt. Covers components, hooks, state, effects, and building modern UIs. Perfect for beginners and those wanting a solid foundation."
          href="https://frontendmasters.com/courses/complete-react-v9/"
        />
        <NovaCard
          title="Rust for TypeScript Developers"
          author="ThePrimeagen"
          date="Sep 2025"
          summary="ThePrimeagen teaches Rust to JavaScript/TypeScript devs. Dive into Rust's memory safety, ownership, and concurrency with fun, practical examples."
          href="https://frontendmasters.com/courses/rust-typescript/"
        />
        <NovaCard
          title="API Design & Node.js"
          author="Scott Moss"
          date="Sep 2025"
          summary="Scott Moss covers building robust APIs with Node.js. Learn REST, authentication, testing, and best practices for scalable backend services."
          href="https://frontendmasters.com/courses/api-design-nodejs/"
        />
        <NovaCard
          title="CSS Grid & Flexbox"
          author="Steve Kinney"
          date="Sep 2025"
          summary="Steve Kinney demystifies CSS Grid and Flexbox. Master layout techniques for responsive, modern web apps with hands-on demos and clear explanations."
          href="https://frontendmasters.com/courses/css-grid-flexbox-v2/"
        />
      </main>
    </div>
  );
}
