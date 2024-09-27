import React, { useEffect } from "react";
import icons from "../../ultil/icon";
import { useState } from "react";
import { Button, Input, Layout, Modal } from "antd";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../FireBase/FireBaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../FireBase/FireBaseConfig";
import { Link } from "react-router-dom";

const { AiOutlineUser } = icons;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClickSignin, setIsClickSignin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const warning = () => {
    Modal.warning({
      content: "Bạn đã đăng xuất",
    });
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    e.target.value = "";
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    e.target.value = "";
  };

  const showModal = (status) => {
    if (status === "signIn") {
      setIsClickSignin(true);
    } else {
      setIsClickSignin(false);
    }
    setIsModalOpen(true);
  };
  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const result = await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: user.email,
      });
      console.log(result);
      setIsModalOpen(false);
      alert("Đăng kí thành công!");
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      // return true;
    } catch (error) {
      alert("Vui lòng nhập thông tin hợp lệ!!!");
      return { error: error.message };
    }
  };

  const signIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      // return true;
      alert("Đăng nhập thành công");
      setIsModalOpen(false);
      setShow(!show);
    } catch (error) {
      alert("Đăng nhập thất bại");
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      return { error: error.message };
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const signOut = async () => {
    try {
      await signOut(auth);
      setShow(false);
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (uid) {
      setIsLogin(true);
    }
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {error ? <div>{error}</div> : null}
      <Modal
        title={isClickSignin ? "Đăng nhập" : "Đăng ký"}
        open={isModalOpen}
        onOk={isClickSignin ? signIn : signUp}
        okText={isClickSignin ? "Đăng nhập" : "Đăng ký"}
        onCancel={handleCancel}
      >
        <div style={{ margin: "10px" }}>
          <Input
            placeholder="Enter your email..."
            onChange={handleChangeEmail}
            id="email"
          />
        </div>
        <div style={{ margin: "10px" }}>
          <Input
            placeholder="Enter your password..."
            type="password"
            onChange={handleChangePassword}
            id="password"
          />
        </div>

        {isClickSignin ? (
          <span style={{ display: "flex", marginTop: "15px" }}>
            Bạn chưa có tài khoản?
            <Link
              type="primary"
              style={{
                margin: "0px 8px",
              }}
              onClick={() => showModal("signUp")}
            >
              Sign Up
            </Link>
          </span>
        ) : (
          <span style={{ display: "flex", marginTop: "15px" }}>
            Bạn đã có tài khoản
            <Link
              type="primary"
              style={{
                margin: "0px 8px",
              }}
              onClick={() => showModal("signIn")}
            >
              Sign In
            </Link>
          </span>
        )}
      </Modal>
      {show && <Button onClick={signOut}>Log Out</Button>}
      {!show && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <button
                type="default"
                style={{
                  margin: "0px 8px",
                  width: "40px",
                  height: "40px",
                  border: "hidden",
                  borderRadius: "50%",
                }}
                onClick={() => showModal("signIn")}
              >
                <AiOutlineUser size={25} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
