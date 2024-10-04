import HowToStep from "./HowToStep";

export default function Usage() {
  const steps = [
    {
      text: "Click 'Login Now' and fill in your email",
    },
    { text: "Check your email for a login link" },
    { text: "Click the link to access your Rooms page" },
    { text: "Start managing your cleaning tasks!" },
  ];
  return (
    <section className="my-8 max-container padding-container">
      <h2 className="text-2xl lg:text-4xl cursor-default text-green-50 font-bold text-center mb-12 default-underline hover:text-accent-300 transition-all duration-100 ">
        How to Use
      </h2>
      <div className="max-w-2xl mx-auto text-lg">
        <ol className="space-y-2">
          {steps.map((step, index) => (
            <HowToStep key={step.text} number={index + 1} text={step.text} />
          ))}
        </ol>
      </div>
    </section>
  );
}
