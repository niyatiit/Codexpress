import React from "react";
import { Link } from "react-router-dom";

const ManageResources = () => {
  return (
    <div class="dashboard-body">

      <div class="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        {/* <!-- Breadcrumb Start --> */}
        <div class="breadcrumb mb-24">
          <ul class="flex-align gap-4">
            <li><a href="index.html" class="text-gray-200 fw-normal text-15 hover-text-main-600">Home</a></li>
            <li> <span class="text-gray-500 fw-normal d-flex"><i class="ph ph-caret-right"></i></span> </li>
            <li><span class="text-main-600 fw-normal text-15">Files & Resources</span></li>
          </ul>
        </div>
        {/* <!-- Breadcrumb End --> */}

        {/* <!-- Breadcrumb Right Start --> */}
        <div class="flex-align gap-8 flex-wrap">
          <div class="position-relative text-gray-500 flex-align gap-4 text-13">
            <span class="text-inherit">Sort by: </span>
            <div class="flex-align text-gray-500 text-13 border border-gray-100 rounded-4 ps-20 focus-border-main-600 bg-white">
              <span class="text-lg"><i class="ph ph-funnel-simple"></i></span>
              <select class="form-control ps-8 pe-20 py-16 border-0 text-inherit rounded-4 text-center">
                <option value="1" selected>Popular</option>
                <option value="1">Latest</option>
                <option value="1">Trending</option>
                <option value="1">Matches</option>
              </select>
            </div>
          </div>
          <div class="flex-align text-gray-500 text-13 border border-gray-100 rounded-4 ps-20 focus-border-main-600 bg-white">
            <span class="text-lg"><i class="ph ph-layout"></i></span>
            <select class="form-control ps-8 pe-20 py-16 border-0 text-inherit rounded-4 text-center" id="exportOptions">
              <option value="" selected disabled>Export</option>
              <option value="csv">CSV</option>
              <option value="json">JSON</option>
            </select>
          </div>
        </div>
        {/* <!-- Breadcrumb Right End --> */}
      </div>

      {/* <!-- Card Start --> */}
      <div class="card">
        {/* <!-- Card Header Start --> */}
        <div class="card-header border-bottom border-gray-100">
          <div class="flex-between flex-wrap gap-8">
            <form action="#" class="w-350 d-sm-block d-none">
              <div class="position-relative">
                <button type="submit" class="input-icon text-xl d-flex text-gray-100 pointer-event-none"><i class="ph ph-magnifying-glass"></i></button>
                <input type="text" class="form-control ps-40 h-40 border-transparent focus-border-main-600 bg-main-50 rounded-pill placeholder-15" placeholder="Search..." />
              </div>
            </form>
            <div class="flex-align gap-8 flex-wrap">
              <div class="position-relative text-gray-500 flex-align gap-4 text-13">
                <span class="text-inherit">Sort by: </span>
                <div class="position-relative">
                  <div class="flex-align gap-8">
                    <button type="button" class="list-view-btn text-gray-200 text-2xl">
                      <i class="ph ph-rows"></i>
                    </button>
                    <button type="button" class="grid-view-btn active text-gray-200 text-2xl">
                      <i class="ph ph-squares-four"></i>
                    </button>
                  </div>
                </div>
              </div>
              <label for="upload" class="btn btn-main text-sm btn-sm px-24 py-12 d-flex align-items-center gap-8">
                <i class="ph ph-upload-simple d-flex text-xl"></i>
                Upload File
              </label>
            </div>
          </div>
        </div>
        {/* <!-- Card Header End --> */}

        <div class="card-body p-0">
          {/* <!-- Grid View Start --> */}
          <div class="grid-view py-20">
            <div class="resource-item-wrapper px-24">
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox1" type="checkbox" />
                </div>
                <label for="checkbox1" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon1.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Assignments</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox2" type="checkbox" />
                </div>
                <label for="checkbox2" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon1.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Design & Art</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox3" type="checkbox" />
                </div>
                <label for="checkbox3" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon1.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Assignments</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox4" type="checkbox" />
                </div>
                <label for="checkbox4" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon1.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Development</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox5" type="checkbox" />
                </div>
                <label for="checkbox5" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon1.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Payments</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox6" type="checkbox" />
                </div>
                <label for="checkbox6" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon1.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Content</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox7" type="checkbox" />
                </div>
                <label for="checkbox7" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon1.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Assignments</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox8" type="checkbox" />
                </div>
                <label for="checkbox8" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon1.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Maths</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox9" type="checkbox" />
                </div>
                <label for="checkbox9" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon1.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Content</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox10" type="checkbox" />
                </div>
                <label for="checkbox10" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon1.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Video</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox11" type="checkbox" />
                </div>
                <label for="checkbox11" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon1.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Invoices</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox12" type="checkbox" />
                </div>
                <label for="checkbox12" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon1.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Presentation</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
            </div>
            <div class="resource-item-wrapper px-24">
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox13" type="checkbox" />
                </div>
                <label for="checkbox13" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon1.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Design & Art</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox14" type="checkbox" />
                </div>
                <label for="checkbox14" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon1.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Presentation</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox15" type="checkbox" />
                </div>
                <label for="checkbox15" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon1.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Assignments</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox16" type="checkbox" />
                </div>
                <label for="checkbox16" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon1.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Payments</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox17" type="checkbox" />
                </div>
                <label for="checkbox17" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon1.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Invoices</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox18" type="checkbox" />
                </div>
                <label for="checkbox18" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon1.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Assignments</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox19" type="checkbox" />
                </div>
                <label for="checkbox19" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon1.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Payments</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox20" type="checkbox" />
                </div>
                <label for="checkbox20" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon1.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Content</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox21" type="checkbox" />
                </div>
                <label for="checkbox21" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon1.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Assignments</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox22" type="checkbox" />
                </div>
                <label for="checkbox22" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon1.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Development</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox23" type="checkbox" />
                </div>
                <label for="checkbox23" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon1.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Video</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox24" type="checkbox" />
                </div>
                <label for="checkbox24" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon1.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Maths</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
            </div>
            <div class="resource-item-wrapper px-24">
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox25" type="checkbox" />
                </div>
                <label for="checkbox25" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon2.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Design & Art</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox26" type="checkbox" />
                </div>
                <label for="checkbox26" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon3.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Articles.pdf</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox27" type="checkbox" />
                </div>
                <label for="checkbox27" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon3.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Payment.xls</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox28" type="checkbox" />
                </div>
                <label for="checkbox28" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon4.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Brief.doc</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox29" type="checkbox" />
                </div>
                <label for="checkbox29" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon3.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Articles.pdf</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox30" type="checkbox" />
                </div>
                <label for="checkbox30" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon4.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Lession.doc</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox31" type="checkbox" />
                </div>
                <label for="checkbox31" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon2.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Revenue.xls</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox32" type="checkbox" />
                </div>
                <label for="checkbox32" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon4.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Class 1st.doc</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox33" type="checkbox" />
                </div>
                <label for="checkbox33" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon4.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Lession.doc</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox34" type="checkbox" />
                </div>
                <label for="checkbox34" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon2.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Budget.xls</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox35" type="checkbox" />
                </div>
                <label for="checkbox35" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon4.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Class 1st.doc</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox36" type="checkbox" />
                </div>
                <label for="checkbox36" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon2.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Design & Art</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
            </div>
            <div class="resource-item-wrapper px-24">
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox37" type="checkbox" />
                </div>
                <label for="checkbox37" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon4.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Brief.doc</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox38" type="checkbox" />
                </div>
                <label for="checkbox38" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon2.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Revenue.xls</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox39" type="checkbox" />
                </div>
                <label for="checkbox39" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon4.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Class 1st.doc</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox40" type="checkbox" />
                </div>
                <label for="checkbox40" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon4.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Lession.doc</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox41" type="checkbox" />
                </div>
                <label for="checkbox41" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon3.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Articles.pdf</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox42" type="checkbox" />
                </div>
                <label for="checkbox42" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon2.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Design & Art</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox43" type="checkbox" />
                </div>
                <label for="checkbox43" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon2.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Budget.xls</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox44" type="checkbox" />
                </div>
                <label for="checkbox44" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon2.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Design & Art</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox45" type="checkbox" />
                </div>
                <label for="checkbox45" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon3.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Payment.xls</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox46" type="checkbox" />
                </div>
                <label for="checkbox46" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon4.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Class 1st.doc</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox47" type="checkbox" />
                </div>
                <label for="checkbox47" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon4.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Lession.doc</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox48" type="checkbox" />
                </div>
                <label for="checkbox48" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon2.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Revenue.xls</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
            </div>
            <div class="resource-item-wrapper px-24">
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox49" type="checkbox" />
                </div>
                <label for="checkbox49" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon4.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Brief.doc</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox50" type="checkbox" />
                </div>
                <label for="checkbox50" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon3.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Articles.pdf</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox51" type="checkbox" />
                </div>
                <label for="checkbox51" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon2.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Design & Art</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
              <div class="resource-item">
                <div class="form-check">
                  <input class="form-check-input border-gray-200 rounded-4" id="checkbox52" type="checkbox" />
                </div>
                <label for="checkbox52" class="">
                  <span class="d-block mb-16"><img src="/assets/images/icons/file-icon2.png" alt="" /></span>
                  <span class="d-block text-gray-400 text-15">Budget.xls</span>
                  <span class="d-block text-gray-200 text-15">32 Files</span>
                </label>
              </div>
            </div>
          </div>
          {/* <!-- Grid View End --> */}

          {/* <!-- List View Start --> */}
          <div class="list-view d-none">
            <div class="card-body p-0 overflow-x-auto scroll-sm scroll-sm-horizontal">
              <table id="studentTable" class="table table-striped style-three w-100">
                <thead>
                  <tr>
                    <th class="fixed-width">
                      <div class="form-check">
                        <input class="form-check-input border-gray-200 rounded-4" type="checkbox" id="selectAll" />
                      </div>
                    </th>
                    <th class="h6 text-gray-300">Name</th>
                    <th class="h6 text-gray-300">Updated By</th>
                    <th class="h6 text-gray-300">Size</th>
                    <th class="h6 text-gray-300">Total Files</th>
                    <th class="h6 text-gray-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="fixed-width">
                      <div class="form-check">
                        <input class="form-check-input border-gray-200 rounded-4" type="checkbox" />
                      </div>
                    </td>
                    <td>
                      <div class="flex-align gap-8">
                        <img src="/assets/images/icons/file-icon-sm1.png" alt="" class="" />
                        <span class="h6 mb-0 fw-medium text-gray-300">Web Development</span>
                      </div>
                    </td>
                    <td>
                      <span class="h6 mb-0 fw-medium text-gray-300">Yesterday by Mir Hossain</span>
                    </td>
                    <td>
                      <span class="h6 mb-0 fw-medium text-gray-300">72MB</span>
                    </td>
                    <td>
                      <span class="h6 mb-0 fw-medium text-gray-300">10 Files</span>
                    </td>
                    <td>
                      <span class="text-13 py-2 px-8 bg-success-50 text-success-600 d-inline-flex align-items-center gap-8 rounded-pill">
                        <span class="w-6 h-6 bg-success-600 rounded-circle flex-shrink-0"></span>
                        Received
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="fixed-width">
                      <div class="form-check">
                        <input class="form-check-input border-gray-200 rounded-4" type="checkbox" />
                      </div>
                    </td>
                    <td>
                      <div class="flex-align gap-8">
                        <img src="/assets/images/icons/file-icon-sm1.png" alt="" class="" />
                        <span class="h6 mb-0 fw-medium text-gray-300">Web Development</span>
                      </div>
                    </td>
                    <td>
                      <span class="h6 mb-0 fw-medium text-gray-300">Yesterday by Mir Hossain</span>
                    </td>
                    <td>
                      <span class="h6 mb-0 fw-medium text-gray-300">72MB</span>
                    </td>
                    <td>
                      <span class="h6 mb-0 fw-medium text-gray-300">10 Files</span>
                    </td>
                    <td>
                      <span class="text-13 py-2 px-8 bg-success-50 text-success-600 d-inline-flex align-items-center gap-8 rounded-pill">
                        <span class="w-6 h-6 bg-success-600 rounded-circle flex-shrink-0"></span>
                        Received
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="fixed-width">
                      <div class="form-check">
                        <input class="form-check-input border-gray-200 rounded-4" type="checkbox" />
                      </div>
                    </td>
                    <td>
                      <div class="flex-align gap-8">
                        <img src="/assets/images/icons/file-icon-sm1.png" alt="" class="" />
                        <span class="h6 mb-0 fw-medium text-gray-300">Web Development</span>
                      </div>
                    </td>
                    <td>
                      <span class="h6 mb-0 fw-medium text-gray-300">Yesterday by Mir Hossain</span>
                    </td>
                    <td>
                      <span class="h6 mb-0 fw-medium text-gray-300">72MB</span>
                    </td>
                    <td>
                      <span class="h6 mb-0 fw-medium text-gray-300">10 Files</span>
                    </td>
                    <td>
                      <span class="text-13 py-2 px-8 bg-success-50 text-success-600 d-inline-flex align-items-center gap-8 rounded-pill">
                        <span class="w-6 h-6 bg-success-600 rounded-circle flex-shrink-0"></span>
                        Received
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="fixed-width">
                      <div class="form-check">
                        <input class="form-check-input border-gray-200 rounded-4" type="checkbox" />
                      </div>
                    </td>
                    <td>
                      <div class="flex-align gap-8">
                        <img src="/assets/images/icons/file-icon-sm4.png" alt="" class="" />
                        <span class="h6 mb-0 fw-medium text-gray-300">Web Development</span>
                      </div>
                    </td>
                    <td>
                      <span class="h6 mb-0 fw-medium text-gray-300">Yesterday by Mir Hossain</span>
                    </td>
                    <td>
                      <span class="h6 mb-0 fw-medium text-gray-300">72MB</span>
                    </td>
                    <td>
                      <span class="h6 mb-0 fw-medium text-gray-300">10 Files</span>
                    </td>
                    <td>
                      <span class="text-13 py-2 px-8 bg-success-50 text-success-600 d-inline-flex align-items-center gap-8 rounded-pill">
                        <span class="w-6 h-6 bg-success-600 rounded-circle flex-shrink-0"></span>
                        Received
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="fixed-width">
                      <div class="form-check">
                        <input class="form-check-input border-gray-200 rounded-4" type="checkbox" />
                      </div>
                    </td>
                    <td>
                      <div class="flex-align gap-8">
                        <img src="/assets/images/icons/file-icon-sm3.png" alt="" class="" />
                        <span class="h6 mb-0 fw-medium text-gray-300">Web Development</span>
                      </div>
                    </td>
                    <td>
                      <span class="h6 mb-0 fw-medium text-gray-300">Yesterday by Mir Hossain</span>
                    </td>
                    <td>
                      <span class="h6 mb-0 fw-medium text-gray-300">72MB</span>
                    </td>
                    <td>
                      <span class="h6 mb-0 fw-medium text-gray-300">10 Files</span>
                    </td>
                    <td>
                      <span class="text-13 py-2 px-8 bg-success-50 text-success-600 d-inline-flex align-items-center gap-8 rounded-pill">
                        <span class="w-6 h-6 bg-success-600 rounded-circle flex-shrink-0"></span>
                        Received
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="fixed-width">
                      <div class="form-check">
                        <input class="form-check-input border-gray-200 rounded-4" type="checkbox" />
                      </div>
                    </td>
                    <td>
                      <div class="flex-align gap-8">
                        <img src="/assets/images/icons/file-icon-sm1.png" alt="" class="" />
                        <span class="h6 mb-0 fw-medium text-gray-300">Web Development</span>
                      </div>
                    </td>
                    <td>
                      <span class="h6 mb-0 fw-medium text-gray-300">Yesterday by Mir Hossain</span>
                    </td>
                    <td>
                      <span class="h6 mb-0 fw-medium text-gray-300">72MB</span>
                    </td>
                    <td>
                      <span class="h6 mb-0 fw-medium text-gray-300">10 Files</span>
                    </td>
                    <td>
                      <span class="text-13 py-2 px-8 bg-warning-50 text-warning-600 d-inline-flex align-items-center gap-8 rounded-pill">
                        <span class="w-6 h-6 bg-warning-600 rounded-circle flex-shrink-0"></span>
                        Pending
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="fixed-width">
                      <div class="form-check">
                        <input class="form-check-input border-gray-200 rounded-4" type="checkbox" />
                      </div>
                    </td>
                    <td>
                      <div class="flex-align gap-8">
                        <img src="/assets/images/icons/file-icon-sm4.png" alt="" class="" />
                        <span class="h6 mb-0 fw-medium text-gray-300">Presentation</span>
                      </div>
                    </td>
                    <td>
                      <span class="h6 mb-0 fw-medium text-gray-300">Yesterday by Mir Hossain</span>
                    </td>
                    <td>
                      <span class="h6 mb-0 fw-medium text-gray-300">72MB</span>
                    </td>
                    <td>
                      <span class="h6 mb-0 fw-medium text-gray-300">10 Files</span>
                    </td>
                    <td>
                      <span class="text-13 py-2 px-8 bg-success-50 text-success-600 d-inline-flex align-items-center gap-8 rounded-pill">
                        <span class="w-6 h-6 bg-success-600 rounded-circle flex-shrink-0"></span>
                        Received
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="fixed-width">
                      <div class="form-check">
                        <input class="form-check-input border-gray-200 rounded-4" type="checkbox" />
                      </div>
                    </td>
                    <td>
                      <div class="flex-align gap-8">
                        <img src="/assets/images/icons/file-icon-sm3.png" alt="" class="" />
                        <span class="h6 mb-0 fw-medium text-gray-300">Payment Details</span>
                      </div>
                    </td>
                    <td>
                      <span class="h6 mb-0 fw-medium text-gray-300">Yesterday by Mir Hossain</span>
                    </td>
                    <td>
                      <span class="h6 mb-0 fw-medium text-gray-300">72MB</span>
                    </td>
                    <td>
                      <span class="h6 mb-0 fw-medium text-gray-300">10 Files</span>
                    </td>
                    <td>
                      <span class="text-13 py-2 px-8 bg-success-50 text-success-600 d-inline-flex align-items-center gap-8 rounded-pill">
                        <span class="w-6 h-6 bg-success-600 rounded-circle flex-shrink-0"></span>
                        Received
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="fixed-width">
                      <div class="form-check">
                        <input class="form-check-input border-gray-200 rounded-4" type="checkbox" />
                      </div>
                    </td>
                    <td>
                      <div class="flex-align gap-8">
                        <img src="/assets/images/icons/file-icon-sm2.png" alt="" class="" />
                        <span class="h6 mb-0 fw-medium text-gray-300">Revenue Card</span>
                      </div>
                    </td>
                    <td>
                      <span class="h6 mb-0 fw-medium text-gray-300">Yesterday by Mir Hossain</span>
                    </td>
                    <td>
                      <span class="h6 mb-0 fw-medium text-gray-300">72MB</span>
                    </td>
                    <td>
                      <span class="h6 mb-0 fw-medium text-gray-300">10 Files</span>
                    </td>
                    <td>
                      <span class="text-13 py-2 px-8 bg-danger-50 text-danger-600 d-inline-flex align-items-center gap-8 rounded-pill">
                        <span class="w-6 h-6 bg-danger-600 rounded-circle flex-shrink-0"></span>
                        Declined
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="fixed-width">
                      <div class="form-check">
                        <input class="form-check-input border-gray-200 rounded-4" type="checkbox" />
                      </div>
                    </td>
                    <td>
                      <div class="flex-align gap-8">
                        <img src="/assets/images/icons/file-icon-sm4.png" alt="" class="" />
                        <span class="h6 mb-0 fw-medium text-gray-300">Invoices</span>
                      </div>
                    </td>
                    <td>
                      <span class="h6 mb-0 fw-medium text-gray-300">Yesterday by Mir Hossain</span>
                    </td>
                    <td>
                      <span class="h6 mb-0 fw-medium text-gray-300">72MB</span>
                    </td>
                    <td>
                      <span class="h6 mb-0 fw-medium text-gray-300">10 Files</span>
                    </td>
                    <td>
                      <span class="text-13 py-2 px-8 bg-warning-50 text-warning-600 d-inline-flex align-items-center gap-8 rounded-pill">
                        <span class="w-6 h-6 bg-warning-600 rounded-circle flex-shrink-0"></span>
                        Pending
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* <!-- List View End --> */}
        </div>

        <div class="card-footer border-top border-gray-100">
          <div class="flex-between flex-wrap gap-8 mt-20">
            <a href="#" class="btn btn-outline-gray rounded-pill py-9 flex-align gap-4">
              <span class="d-flex text-xl"><i class="ph ph-arrow-left"></i></span>
              Previous
            </a>

            <ul class="pagination flex-align flex-wrap">
              <li class="page-item active">
                <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium" href="#">1</a>
              </li>
              <li class="page-item">
                <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium" href="#">2</a>
              </li>
              <li class="page-item">
                <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium" href="#">3</a>
              </li>
              <li class="page-item">
                <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium" href="#">...</a>
              </li>
              <li class="page-item">
                <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium" href="#">8</a>
              </li>
              <li class="page-item">
                <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium" href="#">9</a>
              </li>
              <li class="page-item">
                <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium" href="#">10</a>
              </li>
            </ul>

            <a href="#" class="btn btn-main rounded-pill py-9 flex-align gap-4">
              Next <span class="d-flex text-xl"><i class="ph ph-arrow-right"></i></span>
            </a>
          </div>
        </div>
      </div>
      {/* <!-- Card End --> */}

    </div>
  );
};

export default ManageResources;
