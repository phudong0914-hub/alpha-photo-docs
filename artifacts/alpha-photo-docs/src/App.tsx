import { Switch, Route, Router as WouterRouter } from "wouter";

import ImageLightbox from "@/components/image-lightbox";
import HomePage from "@/pages/home/page";
import MucDichPage from "@/pages/muc-dich/page";
import BieuTuongPage from "@/pages/bieu-tuong/page";
import DuongNetPage from "@/pages/duong-net/page";
import HinhDangPage from "@/pages/hinh-dang/page";
import KhongGianPage from "@/pages/khong-gian/page";
import AnhSangPage from "@/pages/anh-sang/page";
import MauSacPage from "@/pages/mau-sac/page";
import TuongPhanPage from "@/pages/tuong-phan/page";
import ChatLieuPage from "@/pages/chat-lieu/page";
import KichThuocPage from "@/pages/kich-thuoc/page";
import BauKhongKhiPage from "@/pages/bau-khong-khi/page";
import BoCucPage from "@/pages/bo-cuc/page";
import GocChupPage from "@/pages/goc-chup/page";
import TieuDiemPage from "@/pages/tieu-diem/page";
import NhipDieuPage from "@/pages/nhip-dieu/page";
import CanBangPage from "@/pages/can-bang/page";
import PhanCapPage from "@/pages/phan-cap/page";
import TinhThongNhatPage from "@/pages/tinh-thong-nhat/page";
import CourseOverviewPage from "@/pages/course-overview/page";
import CourseSummaryPage from "@/pages/course-summary/page";
import PhantichAnhPage from "@/pages/phan-tich-anh/page";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a0f' }}>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#e4e4ed] mb-4">404</h1>
        <p className="text-[#9d9db5]">Trang không tìm thấy</p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/khoa-hoc" component={CourseOverviewPage} />
      <Route path="/tong-ket" component={CourseSummaryPage} />
      <Route path="/" component={HomePage} />
      <Route path="/muc-dich" component={MucDichPage} />
      <Route path="/bieu-tuong" component={BieuTuongPage} />
      <Route path="/duong-net" component={DuongNetPage} />
      <Route path="/hinh-dang" component={HinhDangPage} />
      <Route path="/khong-gian" component={KhongGianPage} />
      <Route path="/anh-sang" component={AnhSangPage} />
      <Route path="/mau-sac" component={MauSacPage} />
      <Route path="/tuong-phan" component={TuongPhanPage} />
      <Route path="/chat-lieu" component={ChatLieuPage} />
      <Route path="/kich-thuoc" component={KichThuocPage} />
      <Route path="/bau-khong-khi" component={BauKhongKhiPage} />
      <Route path="/bo-cuc" component={BoCucPage} />
      <Route path="/goc-chup" component={GocChupPage} />
      <Route path="/tieu-diem" component={TieuDiemPage} />
      <Route path="/nhip-dieu" component={NhipDieuPage} />
      <Route path="/can-bang" component={CanBangPage} />
      <Route path="/phan-cap" component={PhanCapPage} />
      <Route path="/tinh-thong-nhat" component={TinhThongNhatPage} />
      <Route path="/phan-tich-anh" component={PhantichAnhPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
      <ImageLightbox />
    </WouterRouter>
  );
}
