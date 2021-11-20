import Head from "next/head";
import React from "react";
import { InlineLink } from "../components/Navigation";

export default function About() {
  return (
    <>
      <Head>
        <title>Kill Process | What is KillProcess.dev?</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Do you often struggle finding a simple way to kill a process running on a port? Here's a few easy ways to fix it"
        />
      </Head>
      <section>
        <div className="space-y-5">
          <h1 className="text-lg xs:text-xl font-semibold mb-4 lowercase">
          What is killprocess.dev?
          </h1>
          <p>
            Do you have a process running in the background and you need to stop
            it?
          </p>
          <p>
            Are you a wimpy web developer who dreams of being a strong, beefy, and
            competent software engineer with actual computer skills?
          </p>
          <p>
            Do you search through the same ten or so Stack Overflow posts to solve
            this problem, hoping you will eventually find the one?
          </p>
          <p>
            Does every second you waste looking for a solution amplify the intense
            imposter syndrome currently surging through your tiny div slingin'
            bones?
          </p>
          <p className="font-medium">
            👋 Hey, I'm Ian Matthew. I typically answer yes to all of the above so
            I made this dumb website to help others like me. If you answered yes
            to any of these questions, you can use{" "}
            <InlineLink href="/">the dumb thing here</InlineLink> and bookmark it
            for later.
          </p>
          <p className="font-medium">
            If you're <span className="italic font-normal">really smart</span> you
            can use the <InlineLink href="/bash">bash script</InlineLink> and
            never come back to this website again -- but be careful with all that
            brain!
          </p>
        </div>
      </section>
    </>
  );
}
