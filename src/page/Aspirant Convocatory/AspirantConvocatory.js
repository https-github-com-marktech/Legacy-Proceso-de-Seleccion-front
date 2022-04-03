import React, { useEffect, useState } from "react";
import axios from "axios";
import AspirantConvView from "./AspirantConvView";
import "./Aspirantconv.css";
import { PETITIONS } from "../../../requestUrl";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AspirantConvocatorys = () => {
	const { user } = useSelector((state) => state.auth);
	const { profile } = useSelector((state) => state.sololearn);

	const [Aspirantconvocatories, setAspirantConvocatories] = useState([]);
	const [techTest, setTechTest] = useState([]);
	useEffect(() => {
		try {
			axios.get(PETITIONS.getConvocatories, {}).then((res) => {
				setAspirantConvocatories(res.data);
			});
		} catch (error) {
			return error;
		}
		try {
			axios.get(PETITIONS.getTechTest).then((res) => setTechTest(res.data));
		} catch (error) {
			return error;
		}
	}, []);

	let registrado = [];

	Aspirantconvocatories.map(({ usersRegistered }) =>
		usersRegistered.includes(user._id)
			? registrado.push(true)
			: registrado.push(false)
	);
	console.log(profile)
	return (
		<>
			{profile.length === 0 ? (
				<p>Antes debes llenar el formulario en el siguiente enlace: <Link to="/inscripcion">Formulario de inscripcion</Link> </p>
			) : (
				<div className='AspirantConv_Box'>
					{!registrado.includes(true) ? (
						Aspirantconvocatories.length !== 0 ? (
							<AspirantConvView data={Aspirantconvocatories} test={techTest} />
						) : (
							<p style={{ marginLeft: "100px" }}>
								Aun no hay convocatorias activas, por favor revisar en otro
								momento
							</p>
						)
					) : (
						<div style={{ padding: "100px" }}>
							<p>
								Ya esta inscrito en una convocatoria, por favor espere respuesta{" "}
							</p>
							<p>
								Para ver la prueba tecnica correspondiente a la convocatoria{" "}
								<Link to='aspirante'>Clic aqui</Link>
							</p>
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default AspirantConvocatorys;
