<script setup lang="ts">
</script>

<template>
  <div class="relative hidden w-full md:block">
    <span class="ant-upload-wrapper drag-wrapper block h-[fit-content] p-0">
      <div class="ant-upload ant-upload-drag">
        <span tabindex="0" class="ant-upload ant-upload-btn" role="button">
          <input accept="" multiple="" type="file" style="display: none" />
          <div class="ant-upload-drag-container">
            <div class="chat-input-container relative cursor-pointer">
              <div class="relative text-pretty">
                <div class="chat-input pt-[12px]">
                  <textarea
                    placeholder="请输入你的需求，按「Enter」发送"
                    class="ant-input ant-input-outlined min-h-[60px] caret-[#3DAEFF] box-shadow-none bg-transparent z-[100] box-shadow-none px-[4px] pt-[4px] placeholder:text-col_text03 placeholder:font-['Inter'] font-[350]"
                    style="overflow-y: hidden; resize: none; height: 26px; max-height: 180px"
                  ></textarea>
                </div>
                <div class="flex w-full justify-between px-[12px] pb-[12px] gap-[8px] items-center relative">
                  <div class="flex gap-[8px] items-center">
                    <div class="md:hover:bg-col_bg03 flex min-h-7 min-w-7 items-center justify-center rounded-[8px] cursor-pointer md:hover:bg-[transparent] h-auto w-auto">
                      <div class="rounded-[10px] border border-[#EAEAEA] cursor-pointer md:hover:bg-col_bg12">
                        <span class="ant-upload-wrapper dnd-upload block h-[fit-content] p-0 css-j9bb5n">
                          <div class="ant-upload ant-upload-select">
                            <span class="ant-upload">
                              <input accept="" multiple="" type="file" style="display: none" />
                              <div class="flex flex-col items-center justify-center w-8 h-8">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clip-path="url(#clip0_3682_56652)">
                                    <path
                                      d="M9.45638 13.6142L13.3054 9.76514C13.5786 9.49176 13.5787 9.04823 13.3054 8.77492C13.0662 8.53568 12.6967 8.50634 12.425 8.68584L12.3152 8.77492L8.46615 12.624L8.34669 12.7379C7.0907 13.8724 5.15152 13.8349 3.94108 12.6246C2.69153 11.3751 2.69153 9.34844 3.94108 8.09888L8.97438 3.06558C9.74047 2.29949 10.9829 2.29951 11.7489 3.06558C12.515 3.83168 12.515 5.07406 11.7489 5.84015L6.65695 10.9321C6.42124 11.1675 6.03916 11.1675 5.80345 10.9321C5.56777 10.6965 5.56731 10.3138 5.80276 10.078L9.71049 6.17022C9.98369 5.89684 9.98381 5.45331 9.71049 5.18C9.43716 4.90701 8.99423 4.9076 8.72096 5.18069L4.81323 9.08842C4.03104 9.87097 4.03151 11.1393 4.81392 11.9217C5.59635 12.7038 6.86404 12.7038 7.64649 11.9217L12.7385 6.82968C14.0513 5.51686 14.052 3.38818 12.7392 2.07536C11.4263 0.762546 9.29767 0.763226 7.98485 2.07605L2.95155 7.10935C1.15526 8.90564 1.15526 11.8179 2.95155 13.6142C4.69182 15.3542 7.47958 15.4088 9.28512 13.7771L9.45638 13.6142Z"
                                      fill="#4A4A4F"
                                    ></path>
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3682_56652">
                                      <rect width="16" height="16" fill="white"></rect>
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                            </span>
                          </div>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-1 justify-end items-center gap-[8px]">
                    <div class="">
                      <div class="hailuo-dropdown undefined">
                        <div
                          class="ant-dropdown-trigger flex items-center gap-2 relative h-full md:hover:bg-col_bg03 rounded-[10px] px-[10px] py-[5px] pl-[12px] cursor-not-allowed pointer-events-none"
                          disabled=""
                        >
                          <div
                            class="text-[14px] font-[400] flex items-center gap-1 text-col_text00"
                          >
                            <div class="agent-mode-value-icon">
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.8522 2.03125L4 10.5H8L7.01531 15.9134C7.01344 15.9241 7.01392 15.935 7.01671 15.9454C7.01951 15.9558 7.02456 15.9655 7.0315 15.9737C7.03844 15.982 7.04711 15.9886 7.0569 15.9931C7.06668 15.9977 7.07734 16 7.08812 16V16C7.0996 16 7.11091 15.9973 7.12117 15.9921C7.13142 15.987 7.14033 15.9795 7.14719 15.9703L14 7.5H10L10.9894 2.08594C10.9907 2.07515 10.9897 2.06421 10.9865 2.05383C10.9833 2.04345 10.9779 2.03388 10.9707 2.02575C10.9634 2.01762 10.9546 2.01112 10.9447 2.00668C10.9347 2.00224 10.924 1.99996 10.9131 2V2C10.9012 2.00005 10.8895 2.0029 10.8789 2.00833C10.8683 2.01376 10.8592 2.02161 10.8522 2.03125V2.03125Z"
                                  stroke="currentColor"
                                  stroke-width="1.4"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                              </svg>
                            </div>
                            <span class="flex items-center gap-1"
                              >高效<span
                                class="text-col_brand00 text-[12px] leading-[15px] px-1 py-[2.5px] rounded-[4px] bg-[#3DAEFF14]"
                                >Free</span
                              ></span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="input-send-icon" data-input-icon="true">
                      <div class="rounded-[10px] flex font-[500] gap-[4px] h-full w-full items-center justify-center text-col_text05 cursor-not-allowed bg-[#D3D3D3] p-[8px]">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        ><path
                            d="M8.00166 13.0839V2.6825M8.00166 2.6825L3.28125 6.93367M8.00166 2.6825L12.7221 6.93367"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="square"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </span>
      </div>
    </span>
  </div>
</template>

<style scoped>

.ant-upload-wrapper {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  line-height: 1.5714285714285714;
  list-style: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
}

.drag-wrapper {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  background: rgba(0, 0, 0, 0.02);
  border: 1px dashed #d9d9d9;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.3s;
}

.ant-upload-drag {
  border: 0 !important;
  background-color: transparent !important;
}

.ant-upload {
  outline: 0;
}

.ant-upload-btn {
  padding: 0 !important;
  display: block !important;
}

.ant-upload-drag-container {
  display: table-cell;
  vertical-align: middle;
}

.chat-input-container {
  border: 1px solid transparent;
  border-radius: 20px;
  background-image: -moz-linear-gradient(#fff,#fff),-moz-linear-gradient(left,#86c1ff 0,#948fff 80.81%);
  background-image: linear-gradient(#fff, #fff), linear-gradient(90deg, #86c1ff 0, #948fff 80.81%);
  background-origin: border-box;
  background-clip: content-box, border-box;
}
</style>
