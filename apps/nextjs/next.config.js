/** @type {import("next").NextConfig} */
const config = {
  transpilePackages: ["@acme/ui", "@acme/validators"],

  /** We already do linting and typechecking as separate tasks in CI */
  typescript: { ignoreBuildErrors: true },
};

export default config;
