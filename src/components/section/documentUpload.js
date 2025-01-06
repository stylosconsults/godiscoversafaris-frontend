import React, { useEffect } from 'react';
import { Row, Button, Col } from 'react-bootstrap';
import { Progress } from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';

export default function ImageUpload({
	files,
	setFiles,
	useDropzone,
	edit,
	documentURL,
	text,
	isDocumentChoosed,
	isUploadingDocumentStarted,
	uploadDocumentPercent,
	handleOnUploadDocument,
}) {
	const { getRootProps, getInputProps } = useDropzone({
		accept: 'image/*, application/pdf',
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
		<>
			<Row style={{ marginBottom: '20px', marginTop: '10px', outline: 'none' }}>
				<Col xs={12} lg={12} md={12} sm={12}>
					<object
						data={file.preview}
						type='application/pdf'
						style={{
							width: '100%',
							height: '400px',
							objectFit: 'cover',
							objectPosition: 'center',
						}}
					>
						<a
							href={file.preview}
							rel='noopener noreferrer'
							aria-label='publication'
						>
							publication
						</a>
					</object>
				</Col>
			</Row>
		</>
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
					<object
						data={
							edit
								? documentURL
								: 'https://res.cloudinary.com/dfsai53mw1/image/upload/v1701412926/WEBS/godiscover/document_ppeg6r.png'
						}
						type='application/pdf'
						style={{
							width: '100%',
							height: '400px',
							objectFit: 'cover',
							objectPosition: 'center',
						}}
					>
						<a
							href={
								edit
									? documentURL
									: 'https://res.cloudinary.com/dfsai53mw1/image/upload/v1701412926/WEBS/godiscover/document_ppeg6r.png'
							}
							rel='noopener noreferrer'
							aria-label='publication'
						>
							publication
						</a>
					</object>
				)}
			</Col>
			{!isUploadingDocumentStarted && (
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
							<span>{text ? ` Choose ${text}` : 'Upload document'} </span>
						</p>
					</div>
					{isDocumentChoosed && (
						<Button variant='primary' onClick={e => handleOnUploadDocument(e)}>
							<i className='fa fa-upload aria-hidden="true'></i> Upload document
							to Cloud
						</Button>
					)}
				</Col>
			)}

			{isUploadingDocumentStarted && (
				<Row>
					<Col xs={12} lg={12} md={12} sm={12}>
						<Progress
							percent={uploadDocumentPercent}
							strokeWidth={5}
							style={{ width: '100%' }}
							status={uploadDocumentPercent === 100 ? 'success' : ''}
							theme={{
								default: {
									symbol: uploadDocumentPercent + '%',
									trailColor: 'yellow',
									color: 'orange',
								},
								active: {
									symbol: uploadDocumentPercent + '%',
									trailColor: 'lightblue',
									color: 'blue',
								},
							}}
						/>
						<span>
							{uploadDocumentPercent !== 100
								? uploadDocumentPercent === 0
									? ''
									: "Wait While We're uploading..."
								: text !== ''
								? `${text} uploaded Successfully!`
								: 'Publication document is uploaded Successfully!'}
						</span>
					</Col>
				</Row>
			)}
		</Row>
	);
}
