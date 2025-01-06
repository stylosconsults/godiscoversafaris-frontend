import React, { useEffect } from 'react';
import { Row, Button, Col, Image } from 'react-bootstrap';
import { Progress } from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';

export default function ImageUpload({
	files,
	setFiles,
	useDropzone,
	edit,
	coverURL,
	text,
	isImageChoosed,
	isUploadingImageStarted,
	uploadImagePercent,
	handleOnUploadImage,
}) {
	const { getRootProps, getInputProps } = useDropzone({
		accept: 'image/*',
		mulitple: false,
		onDrop: acceptedFiles => {
			setFiles(
				acceptedFiles.map(file =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				)
			);
		},
	});

	const thumbs = files.map(file => (
		<Image
			src={file.preview}
			key={file.name}
			style={{ width: '100%', outline: 'none' }}
		/>
	));

	useEffect(
		() => () => {
			// Make sure to revoke the data uris to avoid memory leaks
			files.forEach(file => URL.revokeObjectURL(file.preview));
		},
		[files]
	);

	return (
		<Row style={{ marginBottom: '20px', marginTop: '10px', outline: 'none' }}>
			<Col xs={8} lg={8} md={12} sm={12}>
				{thumbs.length > 0 ? (
					thumbs
				) : (
					<Image
						style={{ width: '100%', outline: 'none' }}
						src={
							edit
								? coverURL
								: 'https://res.cloudinary.com/dfsai53mw1/image/upload/v1701413117/WEBS/godiscover/default_Image_rgcqj7_jdxotc.jpg'
						}
					/>
				)}
			</Col>
			{!isUploadingImageStarted && (
				<Col
					xs={4}
					lg={4}
					md={12}
					sm={12}
					style={{
						display: 'flex',
						outline: 'none',
						flexDirection: 'column',
						padding: '8px',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<div
						{...getRootProps({ className: 'dropzone' })}
						style={{
							outline: 'none',
							border: '1px solid #aaaaaa',
							borderRadius: '5px',
							padding: '3px',
							marginBottom: '15px',
							cursor: 'pointer',
							backgroundColor: '#f3f3f3',
						}}
					>
						<input {...getInputProps()} />
						<p>
							<i className='fa fa-upload'> </i>
							<span>{text ? ` Choose ${text}` : 'upload cover image'} </span>
						</p>
					</div>
					{isImageChoosed && (
						<Button variant='primary' onClick={e => handleOnUploadImage(e)}>
							<i className='fa fa-upload aria-hidden="true'></i> Upload Image to
							Cloud
						</Button>
					)}
				</Col>
			)}

			{isUploadingImageStarted && (
				<Row>
					<Col xs={12} lg={12} md={12} sm={12}>
						<Progress
							percent={uploadImagePercent}
							strokeWidth={5}
							style={{ width: '100%' }}
							status={uploadImagePercent === 100 ? 'success' : ''}
							theme={{
								default: {
									symbol: uploadImagePercent + '%',
									trailColor: 'yellow',
									color: 'orange',
								},
								active: {
									symbol: uploadImagePercent + '%',
									trailColor: 'lightblue',
									color: 'blue',
								},
							}}
						/>
						<span>
							{uploadImagePercent !== 100
								? uploadImagePercent === 0
									? ''
									: "Wait While We're uploading..."
								: text !== ''
								? `${text} uploaded Successfully!`
								: 'Cover image is uploaded Successfully!'}
						</span>
					</Col>
				</Row>
			)}
		</Row>
	);
}
