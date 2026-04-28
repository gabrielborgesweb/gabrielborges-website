import React, { useEffect, useState, useMemo } from "react";
import {
  Github,
  Linkedin,
  Code2,
  Gamepad2,
  Cpu,
  ChevronRight,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import SiteMenu from "./components/SiteMenu";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

export interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  language: string;
  fork: boolean;
}

interface GitHubAsset {
  name: string;
  browser_download_url: string;
}

interface GitHubRelease {
  assets: GitHubAsset[];
}

export const Logo = () => (
  <svg
    viewBox="0 0 256 256"
    className="w-10 h-10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="currentColor"
      d="m58 188.6q-17.1 0-30.1-7.3-12.9-7.3-20.1-20.8-7.3-13.4-7.3-31.9 0-19.4 7.7-32.9 7.8-13.5 20.8-20.5 13-7.1 28.8-7.1 10.4 0 19.3 3 9 2.9 15.9 8.3 7 5.5 11.1 12.9 4.3 7.3 5.2 16.1h-32.1q-0.7-3-2.3-5.3-1.6-2.4-4.1-4-2.3-1.6-5.5-2.4-3-0.9-6.8-0.9-8 0-13.7 3.9-5.6 3.7-8.6 11-2.9 7.2-2.9 17.4 0 10.3 2.8 17.6 2.8 7.4 8.4 11.3 5.5 3.9 13.8 3.9 7.3 0 12.1-2.2 4.8-2.1 7.2-6 2.5-3.9 2.5-9.2l5.5 0.7h-26.8v-22.7h52v16.2q0 16.1-6.8 27.5-6.8 11.3-18.8 17.4-11.8 6-27.2 6zm113.8-1.6h-55.2v-117.3h50.8q13.4 0 22.6 3.6 9.1 3.6 13.7 10.2 4.7 6.6 4.7 15.5 0 6.4-2.9 11.8-2.8 5.3-7.9 8.9-5 3.6-11.9 4.9v1.3q7.6 0.2 13.7 3.8 6.2 3.4 9.8 9.7 3.8 6.1 3.8 14.4 0 9.6-5 17.1-5 7.5-14.2 11.8-9.2 4.3-22 4.3zm-23.4-50.2v24.8h14.9q8 0 12-3 4.1-3.1 4.1-8.9 0-4.2-1.9-7-1.9-3-5.4-4.4-3.5-1.5-8.3-1.5zm0-42.1v22.4h13.1q4.2 0 7.3-1.3 3.2-1.3 5-3.8 1.9-2.5 1.9-6.1 0-5.4-4-8.3-3.8-2.9-9.7-2.9z"
    />
    <path
      fill="#00d2ff"
      d="m239.1 188.9q-6.9 0-11.6-4.6-4.6-4.5-4.6-11.4 0-6.8 4.6-11.4 4.7-4.6 11.6-4.6 6.9 0 11.6 4.6 4.6 4.6 4.6 11.4 0 6.9-4.6 11.4-4.7 4.6-11.6 4.6z"
    />
  </svg>
);

const WindowsLogo = ({ size }: { size: number }) => (
  <svg
    viewBox="0 0 32 32"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    width={size}
    height={size}
  >
    <path d="M14.687 16.75h16.309v14.246l-16.12-2.251zM1.004 16.75h12.184v11.81l-12.184-1.69zM14.687 3.44l16.309-2.436v14.246h-16.309zM1.004 5.314l12.184-1.686v11.81h-12.184z"></path>
  </svg>
);

const MacOSLogo = ({ size }: { size: number }) => (
  <svg
    viewBox="-1.5 0 20 20"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
  >
    <g
      id="Dribbble-Light-Preview"
      transform="translate(-102.000000, -7439.000000)"
      fill="currentColor"
    >
      <g id="icons" transform="translate(56.000000, 160.000000)">
        <path
          d="M57.5708873,7282.19296 C58.2999598,7281.34797 58.7914012,7280.17098 58.6569121,7279 C57.6062792,7279.04 56.3352055,7279.67099 55.5818643,7280.51498 C54.905374,7281.26397 54.3148354,7282.46095 54.4735932,7283.60894 C55.6455696,7283.69593 56.8418148,7283.03894 57.5708873,7282.19296 M60.1989864,7289.62485 C60.2283111,7292.65181 62.9696641,7293.65879 63,7293.67179 C62.9777537,7293.74279 62.562152,7295.10677 61.5560117,7296.51675 C60.6853718,7297.73474 59.7823735,7298.94772 58.3596204,7298.97372 C56.9621472,7298.99872 56.5121648,7298.17973 54.9134635,7298.17973 C53.3157735,7298.17973 52.8162425,7298.94772 51.4935978,7298.99872 C50.1203933,7299.04772 49.0738052,7297.68074 48.197098,7296.46676 C46.4032359,7293.98379 45.0330649,7289.44985 46.8734421,7286.3899 C47.7875635,7284.87092 49.4206455,7283.90793 51.1942837,7283.88393 C52.5422083,7283.85893 53.8153044,7284.75292 54.6394294,7284.75292 C55.4635543,7284.75292 57.0106846,7283.67793 58.6366882,7283.83593 C59.3172232,7283.86293 61.2283842,7284.09893 62.4549652,7285.8199 C62.355868,7285.8789 60.1747177,7287.09489 60.1989864,7289.62485"
          id="apple-[#173]"
        ></path>
      </g>
    </g>
  </svg>
);

const LinuxLogo = ({ size }: { size: number }) => (
  <svg
    viewBox="0 0 32 32"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    width={size}
    height={size}
  >
    <path d="M14.923 8.080c-0.025 0.072-0.141 0.061-0.207 0.082-0.059 0.031-0.107 0.085-0.175 0.085-0.062 0-0.162-0.025-0.17-0.085-0.012-0.082 0.11-0.166 0.187-0.166 0.050-0.024 0.108-0.037 0.169-0.037 0.056 0 0.109 0.011 0.157 0.032l-0.003-0.001c0.022 0.009 0.038 0.030 0.038 0.055 0 0.003-0 0.005-0.001 0.008l0-0v0.025h0.004zM15.611 8.080v-0.027c-0.008-0.025 0.016-0.052 0.036-0.062 0.046-0.020 0.1-0.032 0.157-0.032 0.061 0 0.119 0.014 0.17 0.038l-0.002-0.001c0.079 0 0.2 0.084 0.187 0.169-0.007 0.061-0.106 0.082-0.169 0.082-0.069 0-0.115-0.054-0.176-0.085-0.065-0.023-0.182-0.010-0.204-0.081zM16.963 10.058c-0.532 0.337-1.161 0.574-1.835 0.666l-0.024 0.003c-0.606-0.035-1.157-0.248-1.607-0.588l0.007 0.005c-0.192-0.167-0.35-0.335-0.466-0.419-0.205-0.167-0.18-0.416-0.092-0.416 0.136 0.020 0.161 0.167 0.249 0.25 0.12 0.082 0.269 0.25 0.45 0.416 0.397 0.328 0.899 0.541 1.45 0.583l0.009 0.001c0.654-0.057 1.249-0.267 1.763-0.592l-0.016 0.010c0.244-0.169 0.556-0.417 0.81-0.584 0.195-0.17 0.186-0.334 0.349-0.334 0.16 0.020 0.043 0.167-0.184 0.415-0.246 0.188-0.527 0.381-0.818 0.56l-0.044 0.025zM8.017 21.397h0.012c0.069 0 0.137 0.007 0.203 0.019l-0.007-0.001c0.544 0.14 0.992 0.478 1.273 0.931l0.005 0.009 1.137 2.079 0.004 0.004c0.457 0.773 0.948 1.442 1.497 2.059l-0.011-0.013c0.49 0.52 0.82 1.196 0.909 1.946l0.002 0.016v0.008c-0.012 0.817-0.613 1.491-1.396 1.616l-0.009 0.001c-0.2 0.031-0.432 0.048-0.667 0.048-0.857 0-1.659-0.233-2.347-0.64l0.021 0.012c-1.053-0.441-2.275-0.714-3.555-0.752l-0.015-0c-0.372-0.025-0.696-0.215-0.901-0.496l-0.002-0.003c-0.054-0.174-0.085-0.374-0.085-0.582 0-0.35 0.088-0.679 0.244-0.966l-0.005 0.011v-0.005l0.003-0.004c0.041-0.188 0.065-0.405 0.065-0.627 0-0.274-0.036-0.539-0.104-0.791l0.005 0.021c-0.041-0.15-0.065-0.323-0.065-0.502 0-0.242 0.043-0.473 0.123-0.687l-0.004 0.014c0.2-0.417 0.495-0.5 0.862-0.666 0.438-0.133 0.819-0.334 1.151-0.593l-0.008 0.006h0.002v-0.003c0.32-0.335 0.556-0.751 0.835-1.047 0.195-0.249 0.492-0.41 0.827-0.42l0.002-0zM21.531 21.336c-0.001 0.017-0.001 0.038-0.001 0.059 0 0.743 0.449 1.381 1.091 1.658l0.012 0.005c0.048 0.003 0.104 0.005 0.16 0.005 0.831 0 1.575-0.371 2.075-0.957l0.003-0.004 0.264-0.012c0.053-0.008 0.114-0.012 0.176-0.012 0.341 0 0.652 0.132 0.883 0.348l-0.001-0.001 0.004 0.004c0.249 0.301 0.422 0.673 0.487 1.082l0.002 0.013c0.055 0.505 0.238 0.96 0.517 1.34l-0.005-0.008c0.416 0.356 0.705 0.85 0.793 1.411l0.002 0.013 0.004-0.009v0.022l-0.004-0.015c-0.019 0.327-0.231 0.495-0.622 0.744-1.184 0.497-2.201 1.158-3.077 1.968l0.007-0.006c-0.608 0.792-1.501 1.339-2.523 1.486l-0.021 0.002c-0.074 0.010-0.16 0.016-0.247 0.016-0.768 0-1.428-0.464-1.716-1.126l-0.005-0.012-0.006-0.004c-0.093-0.286-0.146-0.615-0.146-0.956 0-0.416 0.079-0.813 0.224-1.178l-0.008 0.022c0.234-0.668 0.435-1.466 0.568-2.288l0.011-0.083c0.016-0.812 0.104-1.593 0.258-2.35l-0.014 0.083c0.085-0.518 0.381-0.954 0.794-1.225l0.007-0.004 0.056-0.027zM18.8 10.142c0.6 2.147 1.339 4.002 2.247 5.757l-0.079-0.167c0.613 1.090 1.090 2.355 1.363 3.695l0.014 0.084c0.009-0 0.020-0 0.031-0 0.217 0 0.427 0.029 0.627 0.084l-0.017-0.004c0.11-0.395 0.173-0.848 0.173-1.316 0-1.426-0.587-2.716-1.533-3.639l-0.001-0.001c-0.275-0.25-0.29-0.419-0.154-0.419 0.971 0.91 1.689 2.078 2.045 3.394l0.012 0.051c0.089 0.329 0.14 0.707 0.14 1.097 0 0.351-0.041 0.693-0.119 1.020l0.006-0.030c0.074 0.038 0.16 0.067 0.251 0.083l0.006 0.001c1.29 0.667 1.766 1.172 1.537 1.921v-0.054c-0.075-0.004-0.15 0-0.225 0h-0.020c0.189-0.584-0.227-1.031-1.331-1.53-1.143-0.5-2.057-0.42-2.212 0.581-0.011 0.049-0.019 0.106-0.022 0.165l-0 0.003c-0.073 0.030-0.16 0.058-0.25 0.078l-0.011 0.002c-0.508 0.336-0.87 0.859-0.989 1.469l-0.002 0.014c-0.148 0.695-0.241 1.5-0.256 2.323l-0 0.012v0.004c-0.091 0.637-0.23 1.207-0.418 1.753l0.020-0.066c-0.983 0.804-2.251 1.29-3.634 1.29-1.13 0-2.184-0.325-3.073-0.887l0.024 0.014c-0.146-0.253-0.313-0.472-0.503-0.667l0.001 0.001c-0.097-0.16-0.211-0.297-0.342-0.415l-0.002-0.001c0.207-0 0.407-0.031 0.596-0.088l-0.015 0.004c0.18-0.085 0.318-0.232 0.391-0.412l0.002-0.005c0.018-0.093 0.029-0.199 0.029-0.308 0-0.445-0.175-0.848-0.461-1.146l0.001 0.001c-0.619-0.761-1.359-1.395-2.196-1.88l-0.038-0.020c-0.671-0.388-1.179-0.995-1.43-1.722l-0.007-0.022c-0.093-0.318-0.147-0.684-0.147-1.062 0-0.353 0.047-0.695 0.134-1.021l-0.006 0.027c0.377-1.314 0.921-2.461 1.62-3.496l-0.028 0.043c0.134-0.081 0.046 0.169-0.51 1.217-0.474 0.713-0.757 1.59-0.757 2.533 0 0.84 0.224 1.627 0.616 2.306l-0.012-0.022c0.052-1.309 0.345-2.537 0.834-3.659l-0.025 0.065c1.055-1.902 1.854-4.111 2.275-6.452l0.020-0.131c0.060 0.045 0.271 0.169 0.361 0.252 0.272 0.166 0.475 0.416 0.737 0.581 0.267 0.26 0.633 0.42 1.035 0.42 0.021 0 0.042-0 0.063-0.001l-0.003 0c0.049 0.004 0.094 0.008 0.137 0.008 0.459-0.009 0.887-0.132 1.259-0.342l-0.013 0.007c0.362-0.167 0.65-0.417 0.925-0.5h0.006c0.535-0.145 0.983-0.454 1.3-0.869l0.004-0.006zM15.301 7.465c0.003 0 0.006-0 0.009-0 0.569 0 1.094 0.187 1.517 0.503l-0.007-0.005c0.378 0.234 0.814 0.433 1.275 0.574l0.040 0.010h0.004c0.246 0.11 0.449 0.281 0.594 0.494l0.003 0.005v-0.164c0.046 0.092 0.074 0.201 0.074 0.316 0 0.098-0.020 0.191-0.055 0.276l0.002-0.005c-0.288 0.507-0.755 0.884-1.313 1.048l-0.016 0.004v0.002c-0.335 0.169-0.626 0.416-0.968 0.581-0.35 0.21-0.771 0.334-1.222 0.334-0.015 0-0.030-0-0.045-0l0.002 0c-0.022 0.001-0.048 0.002-0.074 0.002-0.174 0-0.342-0.031-0.496-0.089l0.010 0.003c-0.159-0.087-0.29-0.169-0.417-0.257l0.014 0.010c-0.227-0.199-0.477-0.39-0.739-0.565l-0.026-0.016v-0.006h-0.006c-0.375-0.199-0.67-0.504-0.852-0.876l-0.005-0.012c-0.027-0.067-0.042-0.145-0.042-0.226 0-0.218 0.112-0.41 0.281-0.522l0.002-0.001c0.28-0.169 0.475-0.339 0.604-0.42 0.13-0.092 0.179-0.127 0.22-0.164h0.002v-0.004c0.268-0.339 0.623-0.599 1.032-0.746l0.016-0.005c0.174-0.050 0.374-0.079 0.581-0.081h0.001zM13.589 5.333h0.045c0.188 0.004 0.361 0.067 0.501 0.17l-0.002-0.002c0.179 0.159 0.325 0.352 0.425 0.57l0.004 0.011c0.113 0.245 0.183 0.53 0.191 0.83l0 0.003v0.005c0.004 0.046 0.006 0.099 0.006 0.152 0 0.063-0.003 0.126-0.009 0.188l0.001-0.008v0.1c-0.037 0.009-0.070 0.022-0.104 0.030-0.191 0.079-0.352 0.163-0.505 0.258l0.014-0.008c0.008-0.055 0.012-0.118 0.012-0.182 0-0.053-0.003-0.106-0.009-0.158l0.001 0.006v-0.019c-0.018-0.154-0.054-0.295-0.107-0.428l0.004 0.011c-0.041-0.132-0.113-0.244-0.207-0.333l-0-0c-0.055-0.050-0.128-0.081-0.209-0.081-0.007 0-0.014 0-0.021 0.001l0.001-0h-0.026c-0.103 0.011-0.189 0.075-0.232 0.163l-0.001 0.002c-0.077 0.093-0.13 0.208-0.15 0.334l-0 0.004c-0.023 0.086-0.035 0.185-0.035 0.287 0 0.044 0.002 0.088 0.007 0.131l-0-0.005v0.019c0.016 0.154 0.052 0.296 0.104 0.428l-0.004-0.011c0.042 0.132 0.113 0.245 0.207 0.335l0 0c0.012 0.012 0.026 0.022 0.042 0.030l0.001 0c-0.083 0.053-0.155 0.109-0.221 0.171l0.001-0.001c-0.045 0.040-0.1 0.070-0.161 0.084l-0.003 0.001c-0.123-0.147-0.237-0.312-0.335-0.486l-0.008-0.016c-0.113-0.245-0.183-0.529-0.194-0.83l-0-0.004c-0.004-0.048-0.006-0.104-0.006-0.161 0-0.241 0.039-0.473 0.11-0.69l-0.004 0.016c0.074-0.258 0.195-0.481 0.356-0.671l-0.002 0.003c0.127-0.15 0.313-0.245 0.522-0.25h0.001zM17.291 5.259h0.016c0.001 0 0.002 0 0.004 0 0.275 0 0.527 0.093 0.729 0.249l-0.003-0.002c0.229 0.177 0.413 0.4 0.542 0.655l0.005 0.011c0.121 0.266 0.196 0.575 0.207 0.901l0 0.004c0-0.025 0.007-0.050 0.007-0.075v0.131l-0.005-0.026-0.005-0.030c-0.003 0.32-0.071 0.622-0.193 0.897l0.006-0.014c-0.062 0.163-0.152 0.303-0.266 0.419l0-0c-0.030-0.018-0.067-0.035-0.104-0.050l-0.006-0.002c-0.135-0.042-0.253-0.099-0.36-0.169l0.005 0.003c-0.077-0.032-0.169-0.060-0.264-0.081l-0.011-0.002c0.081-0.076 0.156-0.157 0.225-0.243l0.004-0.005c0.063-0.148 0.102-0.319 0.11-0.499l0-0.003v-0.025c0-0.008 0-0.016 0-0.025 0-0.17-0.028-0.333-0.080-0.485l0.003 0.011c-0.063-0.159-0.14-0.296-0.232-0.421l0.004 0.005c-0.087-0.088-0.202-0.148-0.331-0.165l-0.003-0h-0.020c-0.001 0-0.003-0-0.004-0-0.132 0-0.25 0.065-0.322 0.164l-0.001 0.001c-0.116 0.113-0.204 0.253-0.254 0.41l-0.002 0.007c-0.063 0.147-0.104 0.318-0.112 0.496l-0 0.003v0.024c0.002 0.12 0.011 0.236 0.027 0.349l-0.002-0.015c-0.241-0.084-0.547-0.169-0.759-0.252-0.012-0.073-0.020-0.159-0.022-0.247l-0-0.003v-0.025c-0.001-0.020-0.001-0.043-0.001-0.066 0-0.324 0.069-0.631 0.194-0.908l-0.006 0.014c0.106-0.279 0.293-0.508 0.532-0.663l0.005-0.003c0.204-0.156 0.462-0.25 0.742-0.25h0zM16.63 1.004c-0.194 0-0.394 0.010-0.6 0.026-5.281 0.416-3.88 6.007-3.961 7.87-0.050 1.426-0.534 2.729-1.325 3.792l0.013-0.018c-1.407 1.602-2.555 3.474-3.351 5.523l-0.043 0.127c-0.258 0.685-0.408 1.476-0.408 2.302 0 0.285 0.018 0.566 0.052 0.841l-0.003-0.033c-0.056 0.046-0.103 0.102-0.136 0.166l-0.001 0.003c-0.325 0.335-0.562 0.75-0.829 1.048-0.283 0.217-0.615 0.388-0.975 0.494l-0.021 0.005c-0.464 0.139-0.842 0.442-1.075 0.841l-0.005 0.009c-0.104 0.212-0.165 0.461-0.165 0.725 0 0.010 0 0.019 0 0.029l-0-0.001c0.002 0.238 0.026 0.469 0.073 0.693l-0.004-0.023c0.056 0.219 0.088 0.471 0.088 0.73 0 0.17-0.014 0.337-0.041 0.5l0.002-0.018c-0.167 0.313-0.264 0.685-0.264 1.080 0 0.278 0.048 0.544 0.137 0.791l-0.005-0.016c0.273 0.388 0.686 0.662 1.164 0.749l0.011 0.002c1.274 0.107 2.451 0.373 3.561 0.78l-0.094-0.030c0.698 0.415 1.539 0.66 2.436 0.66 0.294 0 0.582-0.026 0.862-0.077l-0.029 0.004c0.667-0.151 1.211-0.586 1.504-1.169l0.006-0.013c0.734-0.004 1.537-0.336 2.824-0.417 0.873-0.072 1.967 0.334 3.22 0.25 0.037 0.159 0.086 0.298 0.148 0.429l-0.006-0.013 0.004 0.004c0.384 0.804 1.19 1.35 2.124 1.35 0.081 0 0.161-0.004 0.24-0.012l-0.010 0.001c1.151-0.17 2.139-0.768 2.813-1.623l0.007-0.009c0.843-0.768 1.827-1.401 2.905-1.853l0.067-0.025c0.432-0.191 0.742-0.585 0.81-1.059l0.001-0.007c-0.059-0.694-0.392-1.299-0.888-1.716l-0.004-0.003v-0.121l-0.004-0.004c-0.214-0.33-0.364-0.722-0.421-1.142l-0.002-0.015c-0.053-0.513-0.278-0.966-0.615-1.307l0 0h-0.004c-0.074-0.067-0.154-0.084-0.235-0.169-0.066-0.047-0.148-0.076-0.237-0.080l-0.001-0c0.195-0.602 0.308-1.294 0.308-2.013 0-0.94-0.193-1.835-0.541-2.647l0.017 0.044c-0.704-1.672-1.619-3.111-2.732-4.369l0.014 0.017c-1.105-1.082-1.828-2.551-1.948-4.187l-0.001-0.021c0.033-2.689 0.295-7.664-4.429-7.671z"></path>{" "}
  </svg>
);

const ForgeBanner = ({ isLowPerf }: { isLowPerf: boolean }) => {
  const [downloadUrl, setDownloadUrl] = useState(
    "https://github.com/gabrielborgesweb/opencreate-forge/releases/latest",
  );
  const [platform, setPlatform] = useState("");

  useEffect(() => {
    const detectPlatform = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      if (userAgent.indexOf("win") !== -1) return "Windows";
      if (userAgent.indexOf("mac") !== -1) return "macOS";
      if (userAgent.indexOf("linux") !== -1) return "Linux";
      return "";
    };

    const currentPlatform = detectPlatform();
    setPlatform(currentPlatform);

    fetch(
      "https://api.github.com/repos/gabrielborgesweb/opencreate-forge/releases/latest",
    )
      .then((res) => res.json())
      .then((data: GitHubRelease) => {
        if (data.assets) {
          let asset;
          if (currentPlatform === "Windows") {
            asset = data.assets.find(
              (a: GitHubAsset) =>
                a.name.endsWith(".exe") && !a.name.includes("Setup"),
            );
            if (!asset)
              asset = data.assets.find((a: GitHubAsset) =>
                a.name.endsWith(".exe"),
              );
          } else if (currentPlatform === "macOS") {
            asset = data.assets.find((a: GitHubAsset) =>
              a.name.endsWith(".dmg"),
            );
          } else if (currentPlatform === "Linux") {
            asset = data.assets.find((a: GitHubAsset) =>
              a.name.endsWith(".AppImage"),
            );
          }
          if (asset) {
            setDownloadUrl(asset.browser_download_url);
          }
        }
      })
      .catch(() => {});
  }, []);

  return (
    <m.div
      initial={isLowPerf ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="glass p-6 md:p-10 mb-12 border-forge/30 relative overflow-hidden group hover:border-forge/50 transition-colors duration-500"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-forge/10 rounded-full blur-[80px] -mr-32 -mt-32 transition-colors duration-500 group-hover:bg-forge/20" />
      <div className="relative flex flex-col md:flex-row items-center gap-8">
        <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-forge rounded-4xl p-6 flex items-center justify-center">
          <svg
            viewBox="0 0 512 512"
            className="w-full h-full text-text"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m136.5 204.8h71.7c-2.2 11-3.4 22.4-3.4 34.1 0 26.2 5.9 50.9 16.3 73.1-23.2 18.4-52.6 29.3-84.6 29.3v170.7c-75.4 0-136.5-61.1-136.5-136.5v-239c0-75.4 61.1-136.5 136.5-136.5h227.6c0 26.1-7.3 50.4-20 71.1-42.7 7.9-79.7 31.7-104.9 64.9q-5.8 0.5-11.6 0.5h-91.1zm239 307.2h-136.6l45.5-136.5h91.1c-75.5 0-136.6-61-136.6-136.5 0-75.5 61.1-136.6 136.6-136.6 26.9 0 51.9 7.8 73.1 21.2l63.4-21.2v273.1c0 75.4-61.1 136.5-136.5 136.5zm34.1-273c0-18.9-15.3-34.2-34.1-34.2-18.9 0-34.2 15.3-34.2 34.2 0 18.8 15.3 34.1 34.2 34.1 18.8 0 34.1-15.3 34.1-34.1z" />
          </svg>
        </div>
        <div className="flex-grow text-center md:text-left">
          <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
            <h3 className="text-2xl md:text-3xl font-black">
              OpenCreate Forge
            </h3>
            <span className="px-3 py-1 bg-text/10 border border-text/20 text-text/70 rounded-full text-sm tracking-wide">
              alpha 1
            </span>
          </div>
          <p className="text-text/70 text-lg mb-6 max-w-2xl text-pretty">
            Software de manipulação de imagens moderno, open-source e de alta
            performance. Criado para fluxos de trabalho criativos profissionais.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <m.a
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              href={downloadUrl}
              className="px-6 py-2 bg-forge text-background font-bold rounded-lg flex items-center gap-2 hover:brightness-110 hidden md:inline-flex"
            >
              <span>Baixar{platform ? ` para ${platform}` : ""}</span>
              {platform === "Windows" && <WindowsLogo size={16} />}
              {platform === "macOS" && <MacOSLogo size={16} />}
              {platform === "Linux" && <LinuxLogo size={16} />}
            </m.a>
            <m.a
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              href="https://github.com/gabrielborgesweb/opencreate-forge"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-white/5 hover:bg-white/10 text-text rounded-lg flex items-center gap-2 border border-white/10"
            >
              <span>Saiba Mais</span>
              <ExternalLink size={16} />
            </m.a>
          </div>
        </div>
      </div>
    </m.div>
  );
};

interface AppProps {
  initialRepos?: Repo[];
}

const App: React.FC<AppProps> = ({ initialRepos }) => {
  const [repos, setRepos] = useState<Repo[]>(initialRepos || []);
  const [loading, setLoading] = useState(!initialRepos);
  const [isLowPerf, setIsLowPerf] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // 1. Initial Hardware & Browser Check
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const memory =
      (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 8;
    const cpuCores = navigator.hardwareConcurrency || 4;

    if (memory < 4 || cpuCores < 4 || (isSafari && cpuCores < 8)) {
      setIsLowPerf(true);
      return;
    }

    // 2. Real-time FPS Monitoring
    let frameCount = 0;
    let startTime = performance.now();
    let lowFpsCount = 0;
    let animationFrameId: number;

    const checkPerformance = (time: number) => {
      frameCount++;

      if (time - startTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (time - startTime));

        if (fps < 45) {
          lowFpsCount++;
          if (lowFpsCount >= 3) {
            setIsLowPerf(true);
            return;
          }
        } else {
          lowFpsCount = Math.max(0, lowFpsCount - 1);
        }

        frameCount = 0;
        startTime = time;
      }
      animationFrameId = requestAnimationFrame(checkPerformance);
    };

    animationFrameId = requestAnimationFrame(checkPerformance);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  useEffect(() => {
    if (repos.length > 0) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/gabrielborgesweb/repos?sort=updated&per_page=15",
        );
        const data = await response.json();
        if (isMounted && Array.isArray(data)) {
          const filtered = data
            .filter((repo: Repo) => !repo.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 6);
          setRepos(filtered);
        }
      } catch (error) {
        console.error("Error fetching repos:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchRepos();
    return () => {
      isMounted = false;
    };
  }, [repos.length]);

  const skills = useMemo(
    () => [
      "JavaScript",
      "Python",
      "GDScript",
      "Electron",
      "Postgres",
      "PHP",
      "React",
      "Gemini CLI",
    ],
    [],
  );

  return (
    <LazyMotion features={domAnimation}>
      <div
        className={`min-h-screen relative selection:bg-accent selection:text-bg ${isLowPerf ? "low-perf" : ""}`}
      >
        <div className="fixed inset-0 pointer-events-none -z-10 bg-bg overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[80px] md:blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[80px] md:blur-[100px]" />
        </div>

        <nav
          className={`fixed top-0 w-full z-50 border-b border-glass-border ${isMenuOpen ? "bg-bg/0 border-transparent" : "backdrop-blur-md"}`}
        >
          <div className="container flex justify-between items-center py-4">
            <m.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              href="#"
              className="flex items-center gap-2"
            >
              <Logo />
            </m.a>
            <SiteMenu isLowPerf={isLowPerf} onOpenChange={setIsMenuOpen} />
          </div>
        </nav>

        <header className="pt-48 pb-24 container overflow-hidden">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
            <m.div
              initial={isLowPerf ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex-1 text-center lg:text-left"
            >
              <h1 className="text-4xl md:text-7xl font-black mb-6">
                Olá, eu sou <br />
                <span className="highlight leading-tight">Gabriel Borges</span>.
              </h1>
              <div className="flex flex-wrap gap-2 mb-6 justify-center lg:justify-start">
                {[
                  "Desenvolvedor Full-Stack",
                  "Desenvolvedor de Games",
                  "Entusiasta de Tecnologia",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-accent/10 border border-accent/20 text-accent rounded-full text-sm font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-xl text-text/70 mb-10 max-w-2xl text-pretty mx-auto lg:mx-0">
                Criando experiências digitais rápidas, acessíveis e imersivas.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                <m.a
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  href="#projects"
                  className="btn-primary flex items-center gap-2"
                >
                  {/* Ver Projetos <ChevronRight size={20} /> */}
                  <span>Ver Projetos</span>
                  <ChevronRight
                    size={20}
                    className="hidden sm:block mr-[-10px]"
                  />
                  <ChevronDown size={20} className="sm:hidden mr-[-10px]" />
                </m.a>
                <div className="flex gap-4">
                  <m.a
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    href="https://github.com/gabrielborgesweb"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub de Gabriel Borges"
                    className="w-12 h-12 flex items-center justify-center glass rounded-lg"
                  >
                    <Github size={20} />
                  </m.a>
                  <m.a
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    href="https://www.linkedin.com/in/gabrielborges-sc/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn de Gabriel Borges"
                    className="w-12 h-12 flex items-center justify-center glass rounded-lg"
                  >
                    <Linkedin size={20} />
                  </m.a>
                </div>
              </div>
            </m.div>
            <m.div
              initial={
                isLowPerf
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.95 }
              }
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-64 h-64 md:w-80 md:h-80 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-accent to-secondary animate-morph -z-10 opacity-30 blur-lg" />
              <img
                src="https://github.com/gabrielborgesweb.png"
                alt="Gabriel Borges"
                className="w-full h-full object-cover animate-morph border-2 border-glass-border shadow-2xl"
                loading="eager"
                fetchPriority="high"
              />
            </m.div>
          </div>
        </header>

        <m.section
          initial={isLowPerf ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          id="about-forge"
          className="py-12 container"
        >
          <ForgeBanner isLowPerf={isLowPerf} />
        </m.section>

        <m.section
          initial={isLowPerf ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          id="about"
          className="py-24 container"
        >
          <h2 className="text-3xl md:text-4xl font-black mb-12 text-center">
            Sobre Mim
          </h2>
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3 text-lg text-text/80 space-y-6 text-pretty text-center lg:text-left">
              <p>
                Sou um desenvolvedor brasileiro de 24 anos apaixonado por criar
                aplicações web modernas e experiências imersivas em jogos.
              </p>
              <p>
                Com foco em Desenvolvimento Web e interesse em performance de
                baixo nível, exploro tecnologias como{" "}
                <strong>JavaScript</strong>, <strong>Electron</strong>,{" "}
                <strong>Godot Engine</strong> e <strong>Python</strong>.
              </p>
              <div className="flex flex-wrap gap-6 pt-4 justify-center lg:justify-start">
                <div className="flex items-center gap-2 text-accent">
                  <Code2 size={20} /> <span>Web Dev</span>
                </div>
                <div className="flex items-center gap-2 text-accent">
                  <Gamepad2 size={20} /> <span>Game Dev</span>
                </div>
                <div className="flex items-center gap-2 text-accent">
                  <Cpu size={20} /> <span>Software Engineer</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 glass p-8 text-center lg:text-left">
              <h3 className="text-xl font-bold mb-6">Habilidades Técnicas</h3>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-accent/10 border border-accent/20 text-accent rounded-full text-sm font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </m.section>

        <Projects
          repos={repos}
          loading={loading}
          initialRepos={initialRepos}
          isLowPerf={isLowPerf}
        />
        <Contact isLowPerf={isLowPerf} />

        <footer className="py-12 border-t border-glass-border text-center text-text/40 text-sm">
          <div className="container flex flex-col gap-2">
            <p>&copy; {new Date().getFullYear()} Gabriel Borges</p>
            <p>Criado com React, Tailwind & Lucide</p>
            <p>Hospedado via GitHub Pages</p>
          </div>
        </footer>
      </div>
    </LazyMotion>
  );
};

export default App;
