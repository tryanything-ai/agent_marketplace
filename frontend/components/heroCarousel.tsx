import React, { useState, useEffect } from "react";
import CarouselCard from "./carousel-card";
const data = [
  {
    Name: "Slack",
    Description: "Query Slack Data",
    avatar_url: "https://a.slack-edge.com/4f28/img/slack_logo_mark.svg",
    api_url: "https://api.slack.com/.well-known/ai-plugin.json",
    tags: "unlisted",
    docs_url: "",
    created_at: "5/17/2023 1:15pm",
  },
  {
    Name: "PlugSugar",
    Description: "Seach The Internet",
    avatar_url: "https://websearch.plugsugar.com/200x200.png",
    api_url: "https://websearch.plugsugar.com/.well-known/ai-plugin.json",
    tags: "unlisted",
    docs_url: "",
    created_at: "5/17/2023 1:18pm",
  },
  {
    Name: "Luma",
    Description: "Keep up with and manage your Luma events.",
    avatar_url: "https://lu.ma/apple-touch-icon.png",
    api_url: "https://lu.ma/.well-known/ai-plugin.json",
    tags: "unlisted",
    docs_url: "",
    created_at: "5/17/2023 1:21pm",
  },
  {
    Name: "FreeTV",
    Description:
      "Get latest news delivered right to you! Stay informed with bulletins across multiple categories from credible sources.",
    avatar_url:
      "https://s3.amazonaws.com/static.mixerbox.com/mixerbox/images/icons/230503__News+Plugin.png",
    api_url: "https://www.freetv-app.com/.well-known/ai-plugin.json",
    tags: "unlisted",
    docs_url: "",
    created_at: "5/17/2023 1:22pm",
  },
  {
    Name: "QuickChart",
    Description: "Plugin for generating charts and QR codes.",
    avatar_url: "https://quickchart.io/android-chrome-512x512.png",
    api_url: "https://quickchart.io/.well-known/ai-plugin.json",
    tags: "unlisted",
    docs_url: "",
    created_at: "5/17/2023 1:25pm",
  },
  {
    Name: "PriceRunner",
    Description:
      "This plugin lets users find relevant products when asking for any kind of shopping suggestions",
    avatar_url:
      "https://www.pricerunner.com/images/i/192x192/icon-dark-2020-1024x1024.png",
    api_url: "https://www.pricerunner.com/.well-known/ai-plugin.json",
    tags: "unlisted",
    docs_url: "",
    created_at: "5/17/2023 1:26pm",
  },
  {
    Name: "Medium",
    Description:
      "Plugin for accessing, browsing and extracting Medium content.",
    avatar_url: "https://miro.medium.com/v2/1*m-R_BkNf1Qjr1YbyOIJY2w.png",
    api_url: "https://medium.com/.well-known/ai-plugin.json",
    tags: "unlisted",
    docs_url: "",
    created_at: "5/17/2023 1:27pm",
  },
  {
    Name: "Transvribe",
    Description: "Plugin that allows you to ask any YouTube video a question",
    avatar_url: "https://www.transvribe.com/assets/sq-logo-100.jpg",
    api_url: "https://www.transvribe.com/.well-known/ai-plugin.json",
    tags: "unlisted",
    docs_url: "",
    created_at: "5/17/2023 1:29pm",
  },
  {
    Name: "One Word Domains",
    Description:
      "Check the availability of a domain and compare prices across different registrars.",
    avatar_url: "https://oneword.domains/logo.png",
    api_url: "https://domainsg.pt/.well-known/ai-plugin.json",
    tags: "unlisted",
    docs_url: "",
    created_at: "5/17/2023 1:34pm",
  },
  {
    Name: "URL Reader",
    Description: "Read multiple URLs and their content for chat context",
    avatar_url: "https://www.greenyroad.com/ms-icon-310x310.png",
    api_url: "https://www.greenyroad.com/.well-known/ai-plugin.json",
    tags: "unlisted",
    docs_url: "",
    created_at: "5/17/2023 1:35pm",
  },
  {
    Name: "BizToc",
    Description: "Search BizToc for business & finance news.",
    avatar_url: "https://biztoc.com/favicon.png",
    api_url: "https://biztoc.com/.well-known/ai-plugin.json",
    tags: "unlisted",
    docs_url: "",
    created_at: "5/17/2023 1:37pm",
  },
  {
    Name: "SceneXPlain",
    Description: "xplore image storytelling beyond pixels",
    avatar_url: "https://scenex.jina.ai/icons/icon-128x128.png",
    api_url: "https://scenex.jina.ai/.well-known/ai-plugin.json",
    tags: "unlisted",
    docs_url: "",
    created_at: "5/17/2023 1:39pm",
  },
  {
    Name: "APIs Guru",
    Description: "Plugin for accessing APIs.guru OpenAPI Directory.",
    avatar_url: "https://api.apis.guru/logo.svg",
    api_url: "https://apis.guru/.well-known/ai-plugin.json",
    tags: "unlisted",
    docs_url: "",
    created_at: "5/17/2023 1:41pm",
  },
  {
    Name: "URL Box ( Screenshot )",
    Description:
      "Render HTML to an image or ask to see the web page of any URL or organisation.",
    avatar_url: "https://www.urlbox.io/logos/logo4.png",
    api_url: "https://www.urlbox.io/.well-known/ai-plugin.json",
    tags: "unlisted",
    docs_url: "",
    created_at: "5/17/2023 1:43pm",
  },
  {
    Name: "Query Datasette.io",
    Description: "Run SQL against data in Datasette.",
    avatar_url:
      "https://avatars.githubusercontent.com/u/126964132?s=400&u=08b2ed680144a4feb421308f09e5f3cc5876211a&v=4",
    api_url: "https://datasette.io/.well-known/ai-plugin.json",
    tags: "unlisted",
    docs_url: "",
    created_at: "5/17/2023 1:45pm",
  },
  {
    Name: "School Digger ",
    Description:
      "Get detailed data on over 120,000 K-12 schools and 18,500 districts in the United States.",
    avatar_url: "https://www.schooldigger.com/images/logo-medium.png",
    api_url: "https://www.schooldigger.com/.well-known/ai-plugin.json",
    tags: "unlisted",
    docs_url: "",
    created_at: "5/17/2023 1:46pm",
  },
  {
    Name: "SalesGPT",
    Description:
      "KalendarAI sales agents generate revenue with potential customers from 200+ million companies globally.",
    avatar_url:
      "https://kalendar.ai/assets/logo-black-50c5284888eeea1d77f877d9a6736f1bf23533f975fae3939824cf429ad95e34.png",
    api_url: "https://kalendar.ai/.well-known/ai-plugin.json",
    tags: "unlisted",
    docs_url: "",
    created_at: "5/17/2023 1:47pm",
  },
  {
    Name: "Calculator",
    Description:
      "Plugin for basic arithmetic operations like addition, subtraction, multiplication, division, power, and square root.",
    avatar_url: "https://chat-calculator-plugin.supportmirage.repl.co/logo.png",
    api_url:
      "https://chat-calculator-plugin.supportmirage.repl.co/.well-known/ai-plugin.json",
    tags: "unlisted",
    docs_url: "",
    created_at: "5/17/2023 1:48pm",
  },
];

const Carousel = () => {
  const [plugin, setPlugin] = useState<any>(data[0]);

  //asign a random data to plugin every 1 second
  useEffect(() => {
    setInterval(() => {
      setPlugin(data[Math.floor(Math.random() * data.length)]);
    }, 3000);
  }, []);

  return (
    <div className="w-full h-72  pt-6 flex flex-row justify-center">
      {/* <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box"> */}
      {/* {data.map((item, index) => ( */}
      {/* <div className="" key={index} id={`item-${index}`}> */}
      <CarouselCard
        title={plugin.Name}
        imageUrl={plugin.avatar_url}
        description={plugin.Description}
        url=""
      />
      {/* </div> */}
      {/* ))} */}
    </div>
  );
};

export default Carousel;
