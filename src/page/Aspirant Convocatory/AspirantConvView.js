import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PETITIONS } from "../../../requestUrl";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box, Paper } from '@material-ui/core';
const AspirantConvView = (props) => {
	let { data, test } = props;
	const { user } = useSelector((state) => state.auth);
	const token = useSelector((state) => state.token);

	const handleUserId = async (convId) => {
		const convocatory = await axios.get(
			`${PETITIONS.getOneConvocatory}${convId}`
		);
		let usersInConvo = convocatory.data[0].usersRegistered;

		// Verify if user alredy exist in the array
		if (!usersInConvo.includes(user._id)) {
			usersInConvo.push(user._id); // if the user doesn't exist, add the user to the array
			axios.patch(
				`${PETITIONS.addUsersToConvocatory}${convId}`,
				{
					usersRegistered: usersInConvo,
				},
				{ headers: { Authorization: token } }
			);
			alert("Inscrito");
		} else {
			alert("No se puede inscribir mas");
		}
	};

	return (
		<>
			<div style={{ margin: "100px" }}>
				{data.map(
					({
						_id,
						name,
						initialBootcampDate,
						finalBootcampDate,
						residenceCountry,
						residencyDepartment,
						maxAge,
						maxSocioeconomicStratus,
						gender,
						typePopulation,
					}) => (
						<div style={{ marginTop: "1rem" }} key={_id}>
						<Paper elevation={5} className="convocatoryCard">
{/* 							<Card sx={{ maxWidth: 345 }} >
								<CardActionArea>
									<CardContent> */}
										<Box className="convocatoryCardTitle">
										<Typography gutterBottom variant='h4' component='div'>
											{name}
										</Typography>
										</Box>
										<Box className="convocatoryCardBody">
										<Typography variant='body1' color='inherit'>
											<em>Inicio Bootcamp:</em> {initialBootcampDate}
											<br />
											<em>Fin Bootcamp:</em> {finalBootcampDate}
											<br />
											<Typography variant='overline' color='error'>
												Recuerde tener en cuenta que para aplicar debe de
												cumplir con los siguientes parametros
												<br />
											</Typography>
											<em>Ciudad o pais de residencia:</em>{" "}
											{residenceCountry.map((country) => `${country} `)}
											<br />
											<em>Departamento de residencia:</em>{" "}
											<br />
											{residencyDepartment.map(
												(department) => ` ● ${department}`
											)}
											<br />
											<em>Edad:</em>{" "}
											{maxAge.map((age) =>
												age === "18-"
													? "Menores de 18 "
													: age === "18+"
													? "Mayores de 18 "
													: "unknow"
											)}
											<br />
											<em>Estrato: </em>{" "}
											{maxSocioeconomicStratus.map(
												(stratus) => `estrato ${stratus} `
											)}
											<br />
											<em>Genero segun ID:</em>{" "}
											{gender.map((gender) => `${gender} `)}
											<br />
											<em>Tipo de población:</em>{" "}
											<br />
 											{typePopulation.map((population) => `   •	${population}`)}
											<br />
										</Typography>
										<em>Prueba Tecnica:</em>
										<br />
										<ul className="convocatoryCardUl">
											{test.map(({ convocatories, title, url }) =>
												convocatories.map((id) =>
													id === _id ? (
														<li key={id}>
															{title}{" "}
															<a href={url} target='_blank'>
																Detalles
															</a>
														</li>
													) : null
												)
											)}
										</ul>
{/* 									</CardContent>
								</CardActionArea>
								<CardActions> */}
									<button className='btn btn-warning'
										onClick={() => handleUserId(_id)}
									>
										Postularse
									</button>
{/* 								</CardActions>
							</Card> */}
								</Box>
							</Paper>   
						</div>
					)
				)}
			</div>
		</>
	);
};

export default AspirantConvView;
