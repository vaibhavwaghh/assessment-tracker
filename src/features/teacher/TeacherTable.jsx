import { useDispatch, useSelector } from "react-redux";
import Table from "../../ui/Table";
import { useGetTeachersAllStudents } from "./useTeacher";
import Spinner from "../../ui/Spinner";
import TeacherRow from "./TeacherRow";
import { useSearchParams } from "react-router-dom";
import TeacherMiddleWare from "./TeacherMiddleWare";
import { useGetStatusOfAsssessment } from "../assessmentForStudents/useAssessment";
import { useEffect, useState } from "react";
import { useGetTeachersAllDivisions } from "../operations/useTeacherOperation";
import { updateAllDivOfTeacher } from "../../redux/userSlice";

function TeacherTable() {
  const [searchParams] = useSearchParams();

  const teacherId = useSelector((state) => state.student.teacherId);
  console.log("this is teacher id", teacherId);

  const divisions = useSelector((state) => state.student.allDivTeacher);
  let divNo;
  if (searchParams?.get("division")) {
    divNo = searchParams?.get("division")[3];
  }

  const { isLoading, data: studentData } = useGetTeachersAllStudents(
    divNo || divisions[0]
  );
  // let sort;
  // if (searchParams?.get("sortBy")) {
  //   sort = searchParams?.get("sortBy");
  // }

  if (isLoading) return <Spinner />;
  return (
    // <Menus>
    <Table columns="0.6fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr">
      <Table.Header>
        <div>Roll no</div>
        <div>Student Name</div>
        <div>Submission date</div>
        <div>Status</div>
        <div>Approved</div>
        <div>Marks</div>
        <div> Student Assignment</div>
        <div>Update Marks</div>
      </Table.Header>
      <Table.Body
        data={studentData}
        render={(student) => (
          <TeacherMiddleWare student={student} key={student.id} />
        )}
      />
    </Table>
    // </Menus>
  );
}

export default TeacherTable;
