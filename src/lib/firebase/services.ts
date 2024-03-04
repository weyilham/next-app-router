import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";
import { update } from "firebase/database";

const firestore = getFirestore(app);

export async function retriveData(collectionName: string) {
  const snapsot = await getDocs(collection(firestore, collectionName));
  const data = snapsot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function retriveDataById(collectionName: string, id: string) {
  const snapsot = await getDoc(doc(firestore, collectionName, id));
  const data = snapsot.data();
  return data;
}

export async function registerData(data: {
  fullname: string;
  email: string;
  password: string;
  role?: string;
}) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );

  const snapsot = await getDocs(q);
  const users = snapsot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (users.length > 0) {
    return {
      status: false,
      statusCode: 400,
      message: "Email already exist",
    };
  } else {
    data.role = "Member";
    data.password = await bcrypt.hash(data.password, 10);

    try {
      await addDoc(collection(firestore, "users"), data);
      return { status: true, statusCode: 200, message: "Register Success" };
    } catch (error) {
      return { status: true, statusCode: 400, message: "Register Filed" };
    }
  }
}

export async function login(data: { email: string }) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );
  const snapsot = await getDocs(q);
  const user = snapsot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (user) {
    return user[0];
  } else {
    return null;
  }
}

export async function loginWithGoogle(data: any, callback: any) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );
  const snapsot = await getDocs(q);
  const user = snapsot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (user.length > 0) {
    data.role = data[0].role;
    await updateDoc(doc(firestore, "users", user[0].id), data).then(() => {
      callback({
        status: true,
        data: data,
      });
    });
  } else {
    data.role = "Member";
    await addDoc(collection(firestore, "users"), data).then(() => {
      callback({
        status: true,
        data: data,
      });
    });
  }
}
