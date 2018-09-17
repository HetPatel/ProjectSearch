var autocomplete = new SelectPure(".autocomplete-select", {
  options: [
    {
      label: "Full Time",
      value: "ft",
    },
    {
      label: "Part Time",
      value: "pt",
    },
    {
      label: "Temporary",
      value: "te",
    },
    {
      label: "Contract",
      value: "ct",
    },
    {
      label: "Internship",
      value: "in",
    },
    {
      label: "Commission",
      value: "cm",
    },
    {
      label: "Volunteer",
      value: "vo",
    },
    {
      label: "Casual",
      value: "ca",
    },
    {
      label: "Freelance",
      value: "fl",
    },
    {
      label: "Permanent",
      value: "pe",
    },
    {
      label: "Apprenticeship",
      value: "ap",
    },
  ],
  value: ["pe"],
  multiple: true,
  autocomplete: true,
  icon: "fa fa-times",
  onChange: value => { console.log(value); },
});
