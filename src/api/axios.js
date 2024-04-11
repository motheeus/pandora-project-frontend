import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8801",
    headers: { Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6Ik1hdGhldXMiLCJzb2JyZW5vbWUiOiJaZW5rZXIiLCJ1c2VybmFtZSI6Im16ZW5rZXIiLCJjYXJnbyI6ImFkbWluIiwiaWF0IjoxNzEyODE4MzcyLCJleHAiOjE3MTMwNzc1NzJ9.P33sT_aOe_PvOT3mKTP6Xp-MCV3f2yjqWDiPExu4aqI` }
})