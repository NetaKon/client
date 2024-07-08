import styles from "./Room.module.css";
import student from "../../assets/student.svg";
import mentor from "../../assets/mentor.svg";
import people from "../../assets/people.svg";
import { Roles, SocketEvents } from "../../models/roomTypes";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import CodeEditor from "../../components/codeEditor/CodeEditor";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Correct from "../../components/correctModal/CorrectModal";

const URL = process.env.REACT_APP_BASE_SERVER_URL ?? "";
const socket = io(URL);

type RoomProps = {
  title: string;
  description: string;
  initialCode: string;
  solution: string;
};

const isCorrect = (code: string, solution: string) => {
  return myTrim(code) === myTrim(solution);
};

const myTrim = (str: string) => str.trim().replace(/(\r\n|\n|\r)/gm, "");

function Room() {
  // Load room props from DB
  const { title, description, initialCode, solution } =
    useLoaderData() as RoomProps;

  const [code, setCode] = useState<string | undefined>(undefined);
  const [numParticipants, setNumParticipants] = useState(0);
  const [role, setRole] = useState("");
  const [correct, setCorrect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // The components is first rendered, emit "join room" event
    socket.emit(SocketEvents.JOIN_ROOM, title, initialCode, joinRoomCallback);

    // Register events listeners

    socket.on(SocketEvents.NEW_USER, (numParticipants) => {
      setNumParticipants(numParticipants);
    });

    socket.on(SocketEvents.LEFT_ROOM, (numParticipants) => {
      setNumParticipants(numParticipants);
    });

    socket.on(SocketEvents.MODIFY_CODE, (newCode) => {
      setCode(newCode);
    });

    socket.on(SocketEvents.REDIRECT, () => {
      navigate("/");
    });
  }, []);

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  // When a user modifies the code emit "modify code" event
  useEffect(() => {
    if (code) {
      socket.emit(SocketEvents.MODIFY_CODE, title, code);

      if (isCorrect(code, solution)) {
        setCorrect(true);
      }
    }
  }, [code]);

  const handleCodeChange = (value: string) => {
    setCode(value);
  };

  const joinRoomCallback = (
    code: string,
    role: string,
    numParticipants: number
  ) => {
    setCode(code);
    setNumParticipants(numParticipants);
    setRole(role);
  };

  return (
    <div className={styles.room}>
      <div className={styles.headerContainer}>
        <div className={styles.title}>
          <h1>{title}</h1>
          <img
            src={role === Roles[Roles.Student] ? student : mentor}
            alt="avatar"
          />
        </div>
        <p className={styles.description}>{description}</p>
        <CodeEditor
          code={code ?? ""}
          onCodeChange={handleCodeChange}
          readOnly={role === Roles[Roles.Mentor]}
        />
        <div className={styles.bar}>
          <div className={styles.participants}>
            <img src={people} alt="number of participants icon" />
            <p className={styles.number}>{numParticipants}</p>
          </div>
          <button
            className={styles.leaveButton}
            onClick={() => {
              navigate("/");
            }}
          >
            {role === Roles[Roles.Student] ? "Leave" : "End"}
          </button>
        </div>
      </div>
      {correct && <Correct />}
    </div>
  );
}

export default Room;

// Load room from DB
export async function loader({ params }: any) {
  const id = params.id;
  const response = await fetch(`${URL}/api/rooms/${id}`);
  const resData = await response.json();
  return resData;
}
