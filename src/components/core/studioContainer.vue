<template>
    <div
      class="studio-container h-full overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,0)] flex-1"
      style="display: flex">
      <div class="flex-1 md:mt-[9px] bg-[#F6F7F9] md:border md:border-[#EAEAEA] md:rounded-[20px] md:relative absolute top-0 bottom-0 right-0 w-full flex flex-col flex-1 p-[16px] overflow-hidden text-pretty transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,0)] flex flex-col pt-[16px]">
        <div class="text-[18px] font-[500] text-col_text00 flex justify-between items-center">
          MiniMax 的视窗
          <div class="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
            >
              <path
                d="M6.90967 7.4082C7.22205 7.09613 7.72842 7.09607 8.04076 7.4082L12.001 11.3684L15.9605 7.4089C16.2728 7.09655 16.7798 7.09599 17.0923 7.4082C17.4047 7.72062 17.4047 8.22826 17.0923 8.54068L13.1328 12.5002L17.0916 16.459C17.4039 16.7714 17.4044 17.2784 17.0923 17.5908C16.7799 17.9032 16.2722 17.9032 15.9598 17.5908L12.001 13.632L8.04145 17.5915C7.72902 17.9038 7.22203 17.9032 6.90967 17.5908C6.59751 17.2784 6.59749 16.7721 6.90967 16.4597L10.8692 12.5002L6.90898 8.53999C6.59674 8.22756 6.59731 7.72056 6.90967 7.4082Z"
                fill="#A9A9A9"
              ></path>
            </svg>
          </div>
        </div>
        <div class="flex items-center my-[10px] overflow-x-auto scrollbar-hide">
          <div
            class="cursor-pointer text-pretty flex gap-[10px] px-[12px] py-[6px] text-[14px] text-col_text00 font-[500] rounded-[32px] bg-white"
          >
            <span class="flex-1 text-nowrap">当前进程</span>
          </div>
          <div class="min-w-[1px] h-[16px] bg-[#D7D7D7] rounded-[32px] mr-[8px] ml-[8px]"></div>
          <div
            class="cursor-pointer text-pretty flex gap-[10px] px-[12px] py-[6px] text-[14px] text-col_text01"
          >
            <span class="flex-1 text-nowrap">文件</span>
          </div>
        </div>
        <div class="block w-full h-full overflow-hidden flex-1 relative">
          <div class="w-full h-full overflow-hidden text-pretty"></div>
        </div>
        <div class="hidden w-full h-full overflow-hidden flex-1 relative">
          <div
            class="flex flex-col justify-center items-center h-full w-full rounded-[16px] bg-col_bg15"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="51"
              height="58"
              viewBox="0 0 51 58"
              fill="none"
            >
              <path
                d="M40.0469 0C45.8751 7.79751e-09 50.5995 4.72459 50.5996 10.5527L50.5996 45.0996H46.2002L46.2002 6.1582C46.2001 5.187 45.4126 4.39952 44.4414 4.39941L6.15918 4.39941C5.1879 4.39944 4.40052 5.18695 4.40039 6.1582L4.40039 45.0996H0L0 10.5527C0.000156679 4.72469 4.72469 0.000155048 10.5527 0L40.0469 0Z"
                fill="#A9A9A9"
              ></path>
              <path
                d="M4.40015 47.2998C4.40025 50.3373 6.86264 52.7998 9.90015 52.7998C12.1551 52.7997 14.0915 51.442 14.9402 49.5H20.2585C21.1075 51.4421 23.0446 52.7997 25.2996 52.7998C27.5545 52.7997 29.4917 51.4421 30.3406 49.5H35.6589C36.5078 51.4421 38.4449 52.7998 40.7 52.7998C43.7373 52.7996 46.1998 50.3372 46.2 47.2998V45.0996H50.5994V47.2998C50.5993 52.7672 46.1673 57.2 40.7 57.2002C37.5886 57.2002 34.8138 55.7633 32.9988 53.5186C31.184 55.7628 28.4105 57.2001 25.2996 57.2002C22.1887 57.2001 19.4144 55.7637 17.5994 53.5195C15.7846 55.7635 13.0109 57.2001 9.90015 57.2002C4.43259 57.2002 -0.000145173 52.7673 -0.000244141 47.2998V45.0996H4.40015V47.2998Z"
                fill="#A9A9A9"
              ></path>
              <rect x="14.2998" y="16.5" width="20.9" height="4.4" fill="#A9A9A9"></rect>
              <rect x="14.2998" y="27.5" width="12.1" height="4.4" fill="#5FABFC"></rect>
            </svg>
            <div class="text-col_text03 mt-[16px]">当前无文件</div>
          </div>
        </div>
        <div class="hidden w-full h-full overflow-hidden flex-1 relative">
          <div class="flex h-full w-full border-t border-[#EAEAEA]">
            <div class="w-64 flex-shrink-0">
              <div class="file-tree">
                <div class="file-tree-header">
                  <h3 class="flex justify-between items-center relative">
                  <span>文件</span
                  ><button
                    class="download-button visible opacity-100 flex items-center"
                    title="Download all files"
                    style="width: 20px; height: 20px; min-width: 20px; min-height: 20px"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 12 12"
                      fill="none"
                      style="width: 12px; height: 12px"
                    >
                      <path
                        d="M6 1.5v7.5M6 9l-2-2M6 9l2-2M2 10.5h8"
                        stroke="currentColor"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </button>
                  </h3>
                  <div class="search-container">
                    <div class="search-input-wrapper">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        class="search-icon"
                      >
                        <g clip-path="url(#clip0_2287_19511)">
                          <path
                            d="M6.07692 11.1538C8.88083 11.1538 11.1538 8.88083 11.1538 6.07692C11.1538 3.27301 8.88083 1 6.07692 1C3.27301 1 1 3.27301 1 6.07692C1 8.88083 3.27301 11.1538 6.07692 11.1538Z"
                            stroke="#787979"
                            stroke-width="1.2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M13 13.0003L9.76923 9.76953"
                            stroke="#787979"
                            stroke-width="1.2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_2287_19511">
                            <rect width="14" height="14" fill="white"></rect>
                          </clipPath>
                        </defs></svg
                      ><input class="search-input" placeholder="搜索文件..." type="text" value="" />
                    </div>
                  </div>
                </div>
                <div class="file-tree-content">
                  <div class="file-tree-node">
                    <div class="file-tree-item" style="padding-left: 8px">
                    <span class="folder-icon"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      class="arrow"
                    >
                        <path
                          d="M4.03902 8.77734C3.84376 8.58208 3.84376 8.2655 4.03902 8.07024L6.21909 5.89017L4.10151 3.77258C3.90625 3.57732 3.90625 3.26074 4.10151 3.06548L4.45506 2.71192C4.65032 2.51666 4.96691 2.51666 5.16217 2.71192L7.9906 5.54035C8.18586 5.73561 8.18586 6.05219 7.9906 6.24746L7.63704 6.60101C7.61952 6.61853 7.60103 6.63448 7.58173 6.64885L5.09968 9.1309C4.90442 9.32616 4.58784 9.32616 4.39258 9.1309L4.03902 8.77734Z"
                          fill="#A9A9A9"
                        ></path></svg></span
                    ><span class="file-name flex"
                    ><span class="flex-base-name overflow-hidden"
                    ><span
                      class="ant-typography ant-typography-ellipsis ant-typography-single-line css-j9bb5n"
                      aria-label="co"
                    >components</span
                    ></span
                    ></span
                    ><button
                      class="download-button"
                      title="Download"
                      style="width: 20px; height: 20px; min-width: 20px; min-height: 20px"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 12 12"
                        fill="none"
                        style="width: 12px; height: 12px"
                      >
                        <path
                          d="M6 1.5v7.5M6 9l-2-2M6 9l2-2M2 10.5h8"
                          stroke="currentColor"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </button>
                    </div>
                  </div>
                  <div class="file-tree-node">
                    <div class="file-tree-item" style="padding-left: 8px">
                    <span class="folder-icon"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      class="arrow"
                    >
                        <path
                          d="M4.03902 8.77734C3.84376 8.58208 3.84376 8.2655 4.03902 8.07024L6.21909 5.89017L4.10151 3.77258C3.90625 3.57732 3.90625 3.26074 4.10151 3.06548L4.45506 2.71192C4.65032 2.51666 4.96691 2.51666 5.16217 2.71192L7.9906 5.54035C8.18586 5.73561 8.18586 6.05219 7.9906 6.24746L7.63704 6.60101C7.61952 6.61853 7.60103 6.63448 7.58173 6.64885L5.09968 9.1309C4.90442 9.32616 4.58784 9.32616 4.39258 9.1309L4.03902 8.77734Z"
                          fill="#A9A9A9"
                        ></path></svg></span
                    ><span class="file-name flex"
                    ><span class="flex-base-name overflow-hidden"
                    ><span
                      class="ant-typography ant-typography-ellipsis ant-typography-single-line css-j9bb5n"
                      aria-label="user_inp"
                    >user_input_files</span
                    ></span
                    ></span
                    ><button
                      class="download-button"
                      title="Download"
                      style="width: 20px; height: 20px; min-width: 20px; min-height: 20px"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 12 12"
                        fill="none"
                        style="width: 12px; height: 12px"
                      >
                        <path
                          d="M6 1.5v7.5M6 9l-2-2M6 9l2-2M2 10.5h8"
                          stroke="currentColor"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </button>
                    </div>
                  </div>
                  <div class="file-tree-node">
                    <div class="file-tree-item" style="padding-left: 8px">
                    <span class="file-icon"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                        <path
                          d="M13.2685 5.72465C13.2369 5.65232 13.1926 5.58618 13.1378 5.52932L9.13784 1.52932C9.08098 1.47454 9.01484 1.4303 8.9425 1.39865C8.9225 1.38932 8.90117 1.38398 8.87984 1.37665C8.82404 1.35774 8.76598 1.3463 8.70717 1.34265C8.69317 1.34132 8.6805 1.33398 8.6665 1.33398H3.99984C3.2645 1.33398 2.6665 1.93198 2.6665 2.66732V13.334C2.6665 14.0693 3.2645 14.6673 3.99984 14.6673H11.9998C12.7352 14.6673 13.3332 14.0693 13.3332 13.334V6.00065C13.3332 5.98665 13.3258 5.97398 13.3245 5.95932C13.3209 5.90051 13.3094 5.84245 13.2905 5.78665C13.2843 5.76532 13.2769 5.74465 13.2685 5.72465ZM11.0572 5.33398H9.33317V3.60998L11.0572 5.33398ZM3.99984 13.334V2.66732H7.99984V6.00065C7.99984 6.17746 8.07008 6.34703 8.1951 6.47206C8.32012 6.59708 8.48969 6.66732 8.6665 6.66732H11.9998L12.0012 13.334H3.99984Z"
                          fill="#222222"
                        ></path>
                        <path
                          d="M5.3335 8.00065H10.6668V9.33398H5.3335V8.00065ZM5.3335 10.6673H10.6668V12.0007H5.3335V10.6673ZM5.3335 5.33398H6.66683V6.66732H5.3335V5.33398Z"
                          fill="#222222"
                        ></path></svg></span
                    ><span class="file-name flex"
                    ><span class="flex-base-name overflow-hidden"
                    ><span
                      class="ant-typography ant-typography-ellipsis ant-typography-single-line css-j9bb5n"
                      aria-label="Co"
                    >CodeEditor</span
                    ></span
                    ><span class="file-ext min-w-[fit-content]">.vue</span></span
                    ><span class="file-size">19 KB</span
                    ><button
                      class="download-button"
                      title="Download"
                      style="width: 20px; height: 20px; min-width: 20px; min-height: 20px"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 12 12"
                        fill="none"
                        style="width: 12px; height: 12px"
                      >
                        <path
                          d="M6 1.5v7.5M6 9l-2-2M6 9l2-2M2 10.5h8"
                          stroke="currentColor"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </button>
                    </div>
                  </div>
                  <div class="file-tree-node">
                    <div class="file-tree-item" style="padding-left: 8px">
                    <span class="file-icon"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                        <path
                          d="M13.2685 5.72465C13.2369 5.65232 13.1926 5.58618 13.1378 5.52932L9.13784 1.52932C9.08098 1.47454 9.01484 1.4303 8.9425 1.39865C8.9225 1.38932 8.90117 1.38398 8.87984 1.37665C8.82404 1.35774 8.76598 1.3463 8.70717 1.34265C8.69317 1.34132 8.6805 1.33398 8.6665 1.33398H3.99984C3.2645 1.33398 2.6665 1.93198 2.6665 2.66732V13.334C2.6665 14.0693 3.2645 14.6673 3.99984 14.6673H11.9998C12.7352 14.6673 13.3332 14.0693 13.3332 13.334V6.00065C13.3332 5.98665 13.3258 5.97398 13.3245 5.95932C13.3209 5.90051 13.3094 5.84245 13.2905 5.78665C13.2843 5.76532 13.2769 5.74465 13.2685 5.72465ZM11.0572 5.33398H9.33317V3.60998L11.0572 5.33398ZM3.99984 13.334V2.66732H7.99984V6.00065C7.99984 6.17746 8.07008 6.34703 8.1951 6.47206C8.32012 6.59708 8.48969 6.66732 8.6665 6.66732H11.9998L12.0012 13.334H3.99984Z"
                          fill="#222222"
                        ></path>
                        <path
                          d="M5.3335 8.00065H10.6668V9.33398H5.3335V8.00065ZM5.3335 10.6673H10.6668V12.0007H5.3335V10.6673ZM5.3335 5.33398H6.66683V6.66732H5.3335V5.33398Z"
                          fill="#222222"
                        ></path></svg></span
                    ><span class="file-name flex"
                    ><span class="flex-base-name overflow-hidden"
                    ><span class="ant-typography css-j9bb5n">demo</span></span
                    ><span class="file-ext min-w-[fit-content]">.html</span></span
                    ><span class="file-size">17.6 KB</span
                    ><button
                      class="download-button"
                      title="Download"
                      style="width: 20px; height: 20px; min-width: 20px; min-height: 20px"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 12 12"
                        fill="none"
                        style="width: 12px; height: 12px"
                      >
                        <path
                          d="M6 1.5v7.5M6 9l-2-2M6 9l2-2M2 10.5h8"
                          stroke="currentColor"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </button>
                    </div>
                  </div>
                  <div class="file-tree-node">
                    <div class="file-tree-item" style="padding-left: 8px">
                    <span class="file-icon"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                        <path
                          d="M13.2685 5.72465C13.2369 5.65232 13.1926 5.58618 13.1378 5.52932L9.13784 1.52932C9.08098 1.47454 9.01484 1.4303 8.9425 1.39865C8.9225 1.38932 8.90117 1.38398 8.87984 1.37665C8.82404 1.35774 8.76598 1.3463 8.70717 1.34265C8.69317 1.34132 8.6805 1.33398 8.6665 1.33398H3.99984C3.2645 1.33398 2.6665 1.93198 2.6665 2.66732V13.334C2.6665 14.0693 3.2645 14.6673 3.99984 14.6673H11.9998C12.7352 14.6673 13.3332 14.0693 13.3332 13.334V6.00065C13.3332 5.98665 13.3258 5.97398 13.3245 5.95932C13.3209 5.90051 13.3094 5.84245 13.2905 5.78665C13.2843 5.76532 13.2769 5.74465 13.2685 5.72465ZM11.0572 5.33398H9.33317V3.60998L11.0572 5.33398ZM3.99984 13.334V2.66732H7.99984V6.00065C7.99984 6.17746 8.07008 6.34703 8.1951 6.47206C8.32012 6.59708 8.48969 6.66732 8.6665 6.66732H11.9998L12.0012 13.334H3.99984Z"
                          fill="#222222"
                        ></path>
                        <path
                          d="M5.3335 8.00065H10.6668V9.33398H5.3335V8.00065ZM5.3335 10.6673H10.6668V12.0007H5.3335V10.6673ZM5.3335 5.33398H6.66683V6.66732H5.3335V5.33398Z"
                          fill="#222222"
                        ></path></svg></span
                    ><span class="file-name flex"
                    ><span class="flex-base-name overflow-hidden"
                    ><span class="ant-typography css-j9bb5n">index</span></span
                    ><span class="file-ext min-w-[fit-content]">.html</span></span
                    ><span class="file-size">359 B</span
                    ><button
                      class="download-button"
                      title="Download"
                      style="width: 20px; height: 20px; min-width: 20px; min-height: 20px"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 12 12"
                        fill="none"
                        style="width: 12px; height: 12px"
                      >
                        <path
                          d="M6 1.5v7.5M6 9l-2-2M6 9l2-2M2 10.5h8"
                          stroke="currentColor"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </button>
                    </div>
                  </div>
                  <div class="file-tree-node">
                    <div class="file-tree-item" style="padding-left: 8px">
                    <span class="file-icon"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                        <path
                          d="M13.2685 5.72465C13.2369 5.65232 13.1926 5.58618 13.1378 5.52932L9.13784 1.52932C9.08098 1.47454 9.01484 1.4303 8.9425 1.39865C8.9225 1.38932 8.90117 1.38398 8.87984 1.37665C8.82404 1.35774 8.76598 1.3463 8.70717 1.34265C8.69317 1.34132 8.6805 1.33398 8.6665 1.33398H3.99984C3.2645 1.33398 2.6665 1.93198 2.6665 2.66732V13.334C2.6665 14.0693 3.2645 14.6673 3.99984 14.6673H11.9998C12.7352 14.6673 13.3332 14.0693 13.3332 13.334V6.00065C13.3332 5.98665 13.3258 5.97398 13.3245 5.95932C13.3209 5.90051 13.3094 5.84245 13.2905 5.78665C13.2843 5.76532 13.2769 5.74465 13.2685 5.72465ZM11.0572 5.33398H9.33317V3.60998L11.0572 5.33398ZM3.99984 13.334V2.66732H7.99984V6.00065C7.99984 6.17746 8.07008 6.34703 8.1951 6.47206C8.32012 6.59708 8.48969 6.66732 8.6665 6.66732H11.9998L12.0012 13.334H3.99984Z"
                          fill="#222222"
                        ></path>
                        <path
                          d="M5.3335 8.00065H10.6668V9.33398H5.3335V8.00065ZM5.3335 10.6673H10.6668V12.0007H5.3335V10.6673ZM5.3335 5.33398H6.66683V6.66732H5.3335V5.33398Z"
                          fill="#222222"
                        ></path></svg></span
                    ><span class="file-name flex"
                    ><span class="flex-base-name overflow-hidden"
                    ><span class="ant-typography css-j9bb5n">main</span></span
                    ><span class="file-ext min-w-[fit-content]">.ts</span></span
                    ><span class="file-size">131 B</span
                    ><button
                      class="download-button"
                      title="Download"
                      style="width: 20px; height: 20px; min-width: 20px; min-height: 20px"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 12 12"
                        fill="none"
                        style="width: 12px; height: 12px"
                      >
                        <path
                          d="M6 1.5v7.5M6 9l-2-2M6 9l2-2M2 10.5h8"
                          stroke="currentColor"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </button>
                    </div>
                  </div>
                  <div class="file-tree-node">
                    <div class="file-tree-item" style="padding-left: 8px">
                    <span class="file-icon"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                        <path
                          d="M13.2685 5.72465C13.2369 5.65232 13.1926 5.58618 13.1378 5.52932L9.13784 1.52932C9.08098 1.47454 9.01484 1.4303 8.9425 1.39865C8.9225 1.38932 8.90117 1.38398 8.87984 1.37665C8.82404 1.35774 8.76598 1.3463 8.70717 1.34265C8.69317 1.34132 8.6805 1.33398 8.6665 1.33398H3.99984C3.2645 1.33398 2.6665 1.93198 2.6665 2.66732V13.334C2.6665 14.0693 3.2645 14.6673 3.99984 14.6673H11.9998C12.7352 14.6673 13.3332 14.0693 13.3332 13.334V6.00065C13.3332 5.98665 13.3258 5.97398 13.3245 5.95932C13.3209 5.90051 13.3094 5.84245 13.2905 5.78665C13.2843 5.76532 13.2769 5.74465 13.2685 5.72465ZM11.0572 5.33398H9.33317V3.60998L11.0572 5.33398ZM3.99984 13.334V2.66732H7.99984V6.00065C7.99984 6.17746 8.07008 6.34703 8.1951 6.47206C8.32012 6.59708 8.48969 6.66732 8.6665 6.66732H11.9998L12.0012 13.334H3.99984Z"
                          fill="#222222"
                        ></path>
                        <path
                          d="M5.3335 8.00065H10.6668V9.33398H5.3335V8.00065ZM5.3335 10.6673H10.6668V12.0007H5.3335V10.6673ZM5.3335 5.33398H6.66683V6.66732H5.3335V5.33398Z"
                          fill="#222222"
                        ></path></svg></span
                    ><span class="file-name flex"
                    ><span class="flex-base-name overflow-hidden"
                    ><span class="ant-typography css-j9bb5n">package</span></span
                    ><span class="file-ext min-w-[fit-content]">.json</span></span
                    ><span class="file-size">503 B</span
                    ><button
                      class="download-button"
                      title="Download"
                      style="width: 20px; height: 20px; min-width: 20px; min-height: 20px"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 12 12"
                        fill="none"
                        style="width: 12px; height: 12px"
                      >
                        <path
                          d="M6 1.5v7.5M6 9l-2-2M6 9l2-2M2 10.5h8"
                          stroke="currentColor"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </button>
                    </div>
                  </div>
                  <div class="file-tree-node">
                    <div class="file-tree-item" style="padding-left: 8px">
                    <span class="file-icon"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                        <path
                          d="M13.2685 5.72465C13.2369 5.65232 13.1926 5.58618 13.1378 5.52932L9.13784 1.52932C9.08098 1.47454 9.01484 1.4303 8.9425 1.39865C8.9225 1.38932 8.90117 1.38398 8.87984 1.37665C8.82404 1.35774 8.76598 1.3463 8.70717 1.34265C8.69317 1.34132 8.6805 1.33398 8.6665 1.33398H3.99984C3.2645 1.33398 2.6665 1.93198 2.6665 2.66732V13.334C2.6665 14.0693 3.2645 14.6673 3.99984 14.6673H11.9998C12.7352 14.6673 13.3332 14.0693 13.3332 13.334V6.00065C13.3332 5.98665 13.3258 5.97398 13.3245 5.95932C13.3209 5.90051 13.3094 5.84245 13.2905 5.78665C13.2843 5.76532 13.2769 5.74465 13.2685 5.72465ZM11.0572 5.33398H9.33317V3.60998L11.0572 5.33398ZM3.99984 13.334V2.66732H7.99984V6.00065C7.99984 6.17746 8.07008 6.34703 8.1951 6.47206C8.32012 6.59708 8.48969 6.66732 8.6665 6.66732H11.9998L12.0012 13.334H3.99984Z"
                          fill="#222222"
                        ></path>
                        <path
                          d="M5.3335 8.00065H10.6668V9.33398H5.3335V8.00065ZM5.3335 10.6673H10.6668V12.0007H5.3335V10.6673ZM5.3335 5.33398H6.66683V6.66732H5.3335V5.33398Z"
                          fill="#222222"
                        ></path></svg></span
                    ><span class="file-name flex"
                    ><span class="flex-base-name overflow-hidden"
                    ><span
                      class="ant-typography ant-typography-ellipsis ant-typography-single-line css-j9bb5n"
                      aria-label="postcs"
                    >postcss.config</span
                    ></span
                    ><span class="file-ext min-w-[fit-content]">.js</span></span
                    ><span class="file-size">81 B</span
                    ><button
                      class="download-button"
                      title="Download"
                      style="width: 20px; height: 20px; min-width: 20px; min-height: 20px"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 12 12"
                        fill="none"
                        style="width: 12px; height: 12px"
                      >
                        <path
                          d="M6 1.5v7.5M6 9l-2-2M6 9l2-2M2 10.5h8"
                          stroke="currentColor"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </button>
                    </div>
                  </div>
                  <div class="file-tree-node">
                    <div class="file-tree-item" style="padding-left: 8px">
                    <span class="file-icon"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                        <path
                          d="M13.2685 5.72465C13.2369 5.65232 13.1926 5.58618 13.1378 5.52932L9.13784 1.52932C9.08098 1.47454 9.01484 1.4303 8.9425 1.39865C8.9225 1.38932 8.90117 1.38398 8.87984 1.37665C8.82404 1.35774 8.76598 1.3463 8.70717 1.34265C8.69317 1.34132 8.6805 1.33398 8.6665 1.33398H3.99984C3.2645 1.33398 2.6665 1.93198 2.6665 2.66732V13.334C2.6665 14.0693 3.2645 14.6673 3.99984 14.6673H11.9998C12.7352 14.6673 13.3332 14.0693 13.3332 13.334V6.00065C13.3332 5.98665 13.3258 5.97398 13.3245 5.95932C13.3209 5.90051 13.3094 5.84245 13.2905 5.78665C13.2843 5.76532 13.2769 5.74465 13.2685 5.72465ZM11.0572 5.33398H9.33317V3.60998L11.0572 5.33398ZM3.99984 13.334V2.66732H7.99984V6.00065C7.99984 6.17746 8.07008 6.34703 8.1951 6.47206C8.32012 6.59708 8.48969 6.66732 8.6665 6.66732H11.9998L12.0012 13.334H3.99984Z"
                          fill="#222222"
                        ></path>
                        <path
                          d="M5.3335 8.00065H10.6668V9.33398H5.3335V8.00065ZM5.3335 10.6673H10.6668V12.0007H5.3335V10.6673ZM5.3335 5.33398H6.66683V6.66732H5.3335V5.33398Z"
                          fill="#222222"
                        ></path></svg></span
                    ><span class="file-name flex"
                    ><span class="flex-base-name overflow-hidden"
                    ><span class="ant-typography css-j9bb5n">README</span></span
                    ><span class="file-ext min-w-[fit-content]">.md</span></span
                    ><span class="file-size">6.1 KB</span
                    ><button
                      class="download-button"
                      title="Download"
                      style="width: 20px; height: 20px; min-width: 20px; min-height: 20px"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 12 12"
                        fill="none"
                        style="width: 12px; height: 12px"
                      >
                        <path
                          d="M6 1.5v7.5M6 9l-2-2M6 9l2-2M2 10.5h8"
                          stroke="currentColor"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </button>
                    </div>
                  </div>
                  <div class="file-tree-node">
                    <div class="file-tree-item" style="padding-left: 8px">
                    <span class="file-icon"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                        <path
                          d="M13.2685 5.72465C13.2369 5.65232 13.1926 5.58618 13.1378 5.52932L9.13784 1.52932C9.08098 1.47454 9.01484 1.4303 8.9425 1.39865C8.9225 1.38932 8.90117 1.38398 8.87984 1.37665C8.82404 1.35774 8.76598 1.3463 8.70717 1.34265C8.69317 1.34132 8.6805 1.33398 8.6665 1.33398H3.99984C3.2645 1.33398 2.6665 1.93198 2.6665 2.66732V13.334C2.6665 14.0693 3.2645 14.6673 3.99984 14.6673H11.9998C12.7352 14.6673 13.3332 14.0693 13.3332 13.334V6.00065C13.3332 5.98665 13.3258 5.97398 13.3245 5.95932C13.3209 5.90051 13.3094 5.84245 13.2905 5.78665C13.2843 5.76532 13.2769 5.74465 13.2685 5.72465ZM11.0572 5.33398H9.33317V3.60998L11.0572 5.33398ZM3.99984 13.334V2.66732H7.99984V6.00065C7.99984 6.17746 8.07008 6.34703 8.1951 6.47206C8.32012 6.59708 8.48969 6.66732 8.6665 6.66732H11.9998L12.0012 13.334H3.99984Z"
                          fill="#222222"
                        ></path>
                        <path
                          d="M5.3335 8.00065H10.6668V9.33398H5.3335V8.00065ZM5.3335 10.6673H10.6668V12.0007H5.3335V10.6673ZM5.3335 5.33398H6.66683V6.66732H5.3335V5.33398Z"
                          fill="#222222"
                        ></path></svg></span
                    ><span class="file-name flex"
                    ><span class="flex-base-name overflow-hidden"
                    ><span class="ant-typography css-j9bb5n">style</span></span
                    ><span class="file-ext min-w-[fit-content]">.css</span></span
                    ><span class="file-size">3.8 KB</span
                    ><button
                      class="download-button"
                      title="Download"
                      style="width: 20px; height: 20px; min-width: 20px; min-height: 20px"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 12 12"
                        fill="none"
                        style="width: 12px; height: 12px"
                      >
                        <path
                          d="M6 1.5v7.5M6 9l-2-2M6 9l2-2M2 10.5h8"
                          stroke="currentColor"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </button>
                    </div>
                  </div>
                  <div class="file-tree-node">
                    <div class="file-tree-item" style="padding-left: 8px">
                    <span class="file-icon"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                        <path
                          d="M13.2685 5.72465C13.2369 5.65232 13.1926 5.58618 13.1378 5.52932L9.13784 1.52932C9.08098 1.47454 9.01484 1.4303 8.9425 1.39865C8.9225 1.38932 8.90117 1.38398 8.87984 1.37665C8.82404 1.35774 8.76598 1.3463 8.70717 1.34265C8.69317 1.34132 8.6805 1.33398 8.6665 1.33398H3.99984C3.2645 1.33398 2.6665 1.93198 2.6665 2.66732V13.334C2.6665 14.0693 3.2645 14.6673 3.99984 14.6673H11.9998C12.7352 14.6673 13.3332 14.0693 13.3332 13.334V6.00065C13.3332 5.98665 13.3258 5.97398 13.3245 5.95932C13.3209 5.90051 13.3094 5.84245 13.2905 5.78665C13.2843 5.76532 13.2769 5.74465 13.2685 5.72465ZM11.0572 5.33398H9.33317V3.60998L11.0572 5.33398ZM3.99984 13.334V2.66732H7.99984V6.00065C7.99984 6.17746 8.07008 6.34703 8.1951 6.47206C8.32012 6.59708 8.48969 6.66732 8.6665 6.66732H11.9998L12.0012 13.334H3.99984Z"
                          fill="#222222"
                        ></path>
                        <path
                          d="M5.3335 8.00065H10.6668V9.33398H5.3335V8.00065ZM5.3335 10.6673H10.6668V12.0007H5.3335V10.6673ZM5.3335 5.33398H6.66683V6.66732H5.3335V5.33398Z"
                          fill="#222222"
                        ></path></svg></span
                    ><span class="file-name flex"
                    ><span class="flex-base-name overflow-hidden"
                    ><span
                      class="ant-typography ant-typography-ellipsis ant-typography-single-line css-j9bb5n"
                      aria-label="tailwin"
                    >tailwind.config</span
                    ></span
                    ><span class="file-ext min-w-[fit-content]">.js</span></span
                    ><span class="file-size">347 B</span
                    ><button
                      class="download-button"
                      title="Download"
                      style="width: 20px; height: 20px; min-width: 20px; min-height: 20px"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 12 12"
                        fill="none"
                        style="width: 12px; height: 12px"
                      >
                        <path
                          d="M6 1.5v7.5M6 9l-2-2M6 9l2-2M2 10.5h8"
                          stroke="currentColor"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </button>
                    </div>
                  </div>
                  <div class="file-tree-node">
                    <div class="file-tree-item" style="padding-left: 8px">
                    <span class="file-icon"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                        <path
                          d="M13.2685 5.72465C13.2369 5.65232 13.1926 5.58618 13.1378 5.52932L9.13784 1.52932C9.08098 1.47454 9.01484 1.4303 8.9425 1.39865C8.9225 1.38932 8.90117 1.38398 8.87984 1.37665C8.82404 1.35774 8.76598 1.3463 8.70717 1.34265C8.69317 1.34132 8.6805 1.33398 8.6665 1.33398H3.99984C3.2645 1.33398 2.6665 1.93198 2.6665 2.66732V13.334C2.6665 14.0693 3.2645 14.6673 3.99984 14.6673H11.9998C12.7352 14.6673 13.3332 14.0693 13.3332 13.334V6.00065C13.3332 5.98665 13.3258 5.97398 13.3245 5.95932C13.3209 5.90051 13.3094 5.84245 13.2905 5.78665C13.2843 5.76532 13.2769 5.74465 13.2685 5.72465ZM11.0572 5.33398H9.33317V3.60998L11.0572 5.33398ZM3.99984 13.334V2.66732H7.99984V6.00065C7.99984 6.17746 8.07008 6.34703 8.1951 6.47206C8.32012 6.59708 8.48969 6.66732 8.6665 6.66732H11.9998L12.0012 13.334H3.99984Z"
                          fill="#222222"
                        ></path>
                        <path
                          d="M5.3335 8.00065H10.6668V9.33398H5.3335V8.00065ZM5.3335 10.6673H10.6668V12.0007H5.3335V10.6673ZM5.3335 5.33398H6.66683V6.66732H5.3335V5.33398Z"
                          fill="#222222"
                        ></path></svg></span
                    ><span class="file-name flex"
                    ><span class="flex-base-name overflow-hidden"
                    ><span class="ant-typography css-j9bb5n">tsconfig</span></span
                    ><span class="file-ext min-w-[fit-content]">.json</span></span
                    ><span class="file-size">660 B</span
                    ><button
                      class="download-button"
                      title="Download"
                      style="width: 20px; height: 20px; min-width: 20px; min-height: 20px"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 12 12"
                        fill="none"
                        style="width: 12px; height: 12px"
                      >
                        <path
                          d="M6 1.5v7.5M6 9l-2-2M6 9l2-2M2 10.5h8"
                          stroke="currentColor"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </button>
                    </div>
                  </div>
                  <div class="file-tree-node">
                    <div class="file-tree-item" style="padding-left: 8px">
                    <span class="file-icon"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                        <path
                          d="M13.2685 5.72465C13.2369 5.65232 13.1926 5.58618 13.1378 5.52932L9.13784 1.52932C9.08098 1.47454 9.01484 1.4303 8.9425 1.39865C8.9225 1.38932 8.90117 1.38398 8.87984 1.37665C8.82404 1.35774 8.76598 1.3463 8.70717 1.34265C8.69317 1.34132 8.6805 1.33398 8.6665 1.33398H3.99984C3.2645 1.33398 2.6665 1.93198 2.6665 2.66732V13.334C2.6665 14.0693 3.2645 14.6673 3.99984 14.6673H11.9998C12.7352 14.6673 13.3332 14.0693 13.3332 13.334V6.00065C13.3332 5.98665 13.3258 5.97398 13.3245 5.95932C13.3209 5.90051 13.3094 5.84245 13.2905 5.78665C13.2843 5.76532 13.2769 5.74465 13.2685 5.72465ZM11.0572 5.33398H9.33317V3.60998L11.0572 5.33398ZM3.99984 13.334V2.66732H7.99984V6.00065C7.99984 6.17746 8.07008 6.34703 8.1951 6.47206C8.32012 6.59708 8.48969 6.66732 8.6665 6.66732H11.9998L12.0012 13.334H3.99984Z"
                          fill="#222222"
                        ></path>
                        <path
                          d="M5.3335 8.00065H10.6668V9.33398H5.3335V8.00065ZM5.3335 10.6673H10.6668V12.0007H5.3335V10.6673ZM5.3335 5.33398H6.66683V6.66732H5.3335V5.33398Z"
                          fill="#222222"
                        ></path></svg></span
                    ><span class="file-name flex"
                    ><span class="flex-base-name overflow-hidden"
                    ><span
                      class="ant-typography ant-typography-ellipsis ant-typography-single-line css-j9bb5n"
                      aria-label="tscon"
                    >tsconfig.node</span
                    ></span
                    ><span class="file-ext min-w-[fit-content]">.json</span></span
                    ><span class="file-size">212 B</span
                    ><button
                      class="download-button"
                      title="Download"
                      style="width: 20px; height: 20px; min-width: 20px; min-height: 20px"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 12 12"
                        fill="none"
                        style="width: 12px; height: 12px"
                      >
                        <path
                          d="M6 1.5v7.5M6 9l-2-2M6 9l2-2M2 10.5h8"
                          stroke="currentColor"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </button>
                    </div>
                  </div>
                  <div class="file-tree-node">
                    <div class="file-tree-item" style="padding-left: 8px">
                    <span class="file-icon"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                        <path
                          d="M13.2685 5.72465C13.2369 5.65232 13.1926 5.58618 13.1378 5.52932L9.13784 1.52932C9.08098 1.47454 9.01484 1.4303 8.9425 1.39865C8.9225 1.38932 8.90117 1.38398 8.87984 1.37665C8.82404 1.35774 8.76598 1.3463 8.70717 1.34265C8.69317 1.34132 8.6805 1.33398 8.6665 1.33398H3.99984C3.2645 1.33398 2.6665 1.93198 2.6665 2.66732V13.334C2.6665 14.0693 3.2645 14.6673 3.99984 14.6673H11.9998C12.7352 14.6673 13.3332 14.0693 13.3332 13.334V6.00065C13.3332 5.98665 13.3258 5.97398 13.3245 5.95932C13.3209 5.90051 13.3094 5.84245 13.2905 5.78665C13.2843 5.76532 13.2769 5.74465 13.2685 5.72465ZM11.0572 5.33398H9.33317V3.60998L11.0572 5.33398ZM3.99984 13.334V2.66732H7.99984V6.00065C7.99984 6.17746 8.07008 6.34703 8.1951 6.47206C8.32012 6.59708 8.48969 6.66732 8.6665 6.66732H11.9998L12.0012 13.334H3.99984Z"
                          fill="#222222"
                        ></path>
                        <path
                          d="M5.3335 8.00065H10.6668V9.33398H5.3335V8.00065ZM5.3335 10.6673H10.6668V12.0007H5.3335V10.6673ZM5.3335 5.33398H6.66683V6.66732H5.3335V5.33398Z"
                          fill="#222222"
                        ></path></svg></span
                    ><span class="file-name flex"
                    ><span class="flex-base-name overflow-hidden"
                    ><span
                      class="ant-typography ant-typography-ellipsis ant-typography-single-line css-j9bb5n"
                      aria-label="vit"
                    >vite.config</span
                    ></span
                    ><span class="file-ext min-w-[fit-content]">.ts</span></span
                    ><span class="file-size">213 B</span
                    ><button
                      class="download-button"
                      title="Download"
                      style="width: 20px; height: 20px; min-width: 20px; min-height: 20px"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 12 12"
                        fill="none"
                        style="width: 12px; height: 12px"
                      >
                        <path
                          d="M6 1.5v7.5M6 9l-2-2M6 9l2-2M2 10.5h8"
                          stroke="currentColor"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-1 flex flex-col overflow-hidden">
              <div class="flex-shrink-0 overflow-hidden"></div>
              <div class="flex-1 overflow-hidden">
                <div class="flex items-center justify-center h-full text-gray-500">
                  <div class="text-center">
                    <div class="text-lg mb-2">选择要查看的文件</div>
                    <div class="text-sm">从左侧的文件树中选择一个文件开始查看或编辑</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="hidden w-full h-full overflow-hidden flex-1 relative">
          <div class="w-full h-full flex bg-[#fff] flex-col">
            <div class="flex items-center justify-center py-[12px] border-b border-col_line00">
              <div class="flex p-[2px] text-col_text01 rounded-[10px] bg-col_bg12">
                <button
                  class="h-[28px] w-[90px] px-2 text-[14px] rounded-[8px] flex gap-[4px] justify-center items-center transition-all duration-200 ease-in-out bg-[#fff] text-col_text00 shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                  >
                    <path
                      d="M4.5 5.5L1.5 8L4.5 10.5"
                      stroke="#222222"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M12.5 5.5L15.5 8L12.5 10.5"
                      stroke="#222222"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M10.5 2.5L6.5 13.5"
                      stroke="#222222"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path></svg
                  >code</button
                ><button
                class="h-[28px] w-[90px] px-2 text-[14px] rounded-[8px] flex gap-[4px] justify-center items-center transition-all duration-200 ease-in-out opacity-50 cursor-not-allowed"
                disabled=""
                aria-disabled="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M12.7849 6.3C12.9388 6.49195 13.0241 6.74134 13.0241 6.99992C13.0241 7.2585 12.9388 7.50788 12.7849 7.69984C11.8099 8.8803 9.59054 11.1785 6.99982 11.1785C4.40911 11.1785 2.18982 8.8803 1.21482 7.69984C1.06083 7.50788 0.975586 7.2585 0.975586 6.99992C0.975586 6.74134 1.06083 6.49195 1.21482 6.3C2.18982 5.11953 4.40911 2.82129 6.99982 2.82129C9.59054 2.82129 11.8099 5.11953 12.7849 6.3Z"
                    stroke="#787979"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M6.99972 8.85686C8.02539 8.85686 8.85686 8.02539 8.85686 6.99972C8.85686 5.97405 8.02539 5.14258 6.99972 5.14258C5.97405 5.14258 5.14258 5.97405 5.14258 6.99972C5.14258 8.02539 5.97405 8.85686 6.99972 8.85686Z"
                    stroke="#787979"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path></svg
                >preview
              </button>
              </div>
            </div>
            <div class="flex-1 overflow-hidden">
              <div class="w-full h-full overflow-auto p-[12px]">
                <pre class="typewriter-pre"></pre>
              </div>
            </div>
          </div>
        </div>
        <div class="hidden w-full h-full overflow-hidden flex-1 relative">
          <div
            class="tool-call-base-wrapper flex-1 w-full h-full bg-white rounded-[12px] overflow-hidden flex flex-col py-[12px]"
          >
            <div
              class="tool-call-base-wrapper-title px-2 md:px-4 pb-3 text-col_text00 text-[14px] leading-[17px]"
            >
              <div class="text-[14px] text-col_text00 flex items-center"><span>0 个来源</span></div>
            </div>
            <div
              class="adm-divider adm-divider-horizontal adm-divider-center m-[0] mb-[10px] w-full"
            ></div>
            <div
              class="flex-1 overflow-y-auto overflow-x-hidden hide-scroll text-pretty break-all px-3 md:px-4"
              style="scrollbar-width: none"
            >
              <div class="w-full h-full flex flex-col gap-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
</style>
