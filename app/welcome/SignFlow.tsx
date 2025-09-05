// // import React, { useState, useRef, useCallback } from "react";
// // import {
// //   Upload,
// //   FileText,
// //   Send,
// //   Users,
// //   Check,
// //   X,
// //   Download,
// //   Eye,
// //   Edit3,
// //   MousePointer,
// // } from "lucide-react";

// // // Type Definitions
// // interface Document {
// //   id: number;
// //   name: string;
// //   size: string;
// //   type: string;
// //   file: File;
// //   url: string;
// // }

// // interface Recipient {
// //   email: string;
// //   role: "signer" | "approver" | "viewer";
// //   color: string;
// // }

// // interface SignatureField {
// //   id: number;
// //   x: number;
// //   y: number;
// //   type: string;
// //   recipientIndex: number;
// //   width: number;
// //   height: number;
// // }

// // type StepId = "upload" | "recipients" | "prepare" | "sign";

// // interface Step {
// //   id: StepId;
// //   title: string;
// //   icon: React.ComponentType<any>;
// // }

// // // Header Component
// // const Header: React.FC = () => (
// //   <header className="bg-white shadow-sm border-b">
// //     <div className="max-w-7xl mx-auto px-4 py-4">
// //       <div className="flex items-center justify-between">
// //         <div className="flex items-center space-x-3">
// //           <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
// //             <FileText className="w-5 h-5 text-white" />
// //           </div>
// //           <h1 className="text-2xl font-bold text-gray-900">SignFlow</h1>
// //         </div>
// //         <div className="text-sm text-gray-500">Fast • Secure • Simple</div>
// //       </div>
// //     </div>
// //   </header>
// // );

// // // Progress Steps Component
// // interface ProgressStepsProps {
// //   currentStep: StepId;
// //   steps: Step[];
// // }

// // const ProgressSteps: React.FC<ProgressStepsProps> = ({
// //   currentStep,
// //   steps,
// // }) => (
// //   <div className="flex items-center justify-between mb-8">
// //     {steps.map((step, index) => {
// //       const Icon = step.icon;
// //       const isActive = step.id === currentStep;
// //       const isCompleted = steps.findIndex((s) => s.id === currentStep) > index;

// //       return (
// //         <div key={step.id} className="flex items-center">
// //           <div
// //             className={`flex items-center justify-center w-10 h-10 rounded-full ${
// //               isActive
// //                 ? "bg-blue-600 text-white"
// //                 : isCompleted
// //                   ? "bg-green-500 text-white"
// //                   : "bg-gray-200 text-gray-500"
// //             }`}
// //           >
// //             {isCompleted ? (
// //               <Check className="w-5 h-5" />
// //             ) : (
// //               <Icon className="w-5 h-5" />
// //             )}
// //           </div>
// //           <span
// //             className={`ml-2 text-sm font-medium ${
// //               isActive
// //                 ? "text-blue-600"
// //                 : isCompleted
// //                   ? "text-green-600"
// //                   : "text-gray-500"
// //             }`}
// //           >
// //             {step.title}
// //           </span>
// //           {index < steps.length - 1 && (
// //             <div
// //               className={`w-16 h-0.5 mx-4 ${
// //                 isCompleted ? "bg-green-500" : "bg-gray-200"
// //               }`}
// //             />
// //           )}
// //         </div>
// //       );
// //     })}
// //   </div>
// // );

// // // Document Upload Component
// // interface DocumentUploadProps {
// //   documents: Document[];
// //   setDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
// //   onNext: () => void;
// // }

// // const DocumentUpload: React.FC<DocumentUploadProps> = ({
// //   documents,
// //   setDocuments,
// //   onNext,
// // }) => {
// //   const fileInputRef = useRef<HTMLInputElement>(null);

// //   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
// //     const files = Array.from(event.target.files || []);
// //     const newDocs: Document[] = files.map((file) => ({
// //       id: Date.now() + Math.random(),
// //       name: file.name,
// //       size: (file.size / 1024 / 1024).toFixed(2) + " MB",
// //       type: file.type,
// //       file: file,
// //       url: URL.createObjectURL(file),
// //     }));
// //     setDocuments((prev) => [...prev, ...newDocs]);
// //   };

// //   const removeDocument = (docId: number) => {
// //     setDocuments((prev) => prev.filter((d) => d.id !== docId));
// //   };

// //   return (
// //     <div className="text-center">
// //       <h2 className="text-2xl font-bold text-gray-900 mb-6">
// //         Upload Your Documents
// //       </h2>

// //       <div
// //         onClick={() => fileInputRef.current?.click()}
// //         className="border-2 border-dashed border-blue-300 rounded-xl p-12 hover:border-blue-400 transition-colors cursor-pointer bg-blue-50/50"
// //       >
// //         <Upload className="w-16 h-16 text-blue-500 mx-auto mb-4" />
// //         <p className="text-lg text-gray-700 mb-2">
// //           Drag & drop files here or click to browse
// //         </p>
// //         <p className="text-sm text-gray-500">
// //           PDF, Word, or image files supported
// //         </p>
// //       </div>

// //       <input
// //         ref={fileInputRef}
// //         type="file"
// //         multiple
// //         accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
// //         onChange={handleFileUpload}
// //         className="hidden"
// //       />

// //       {documents.length > 0 && (
// //         <DocumentList
// //           documents={documents}
// //           onRemove={removeDocument}
// //           onNext={onNext}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // // Document List Component
// // interface DocumentListProps {
// //   documents: Document[];
// //   onRemove: (docId: number) => void;
// //   onNext: () => void;
// // }

// // const DocumentList: React.FC<DocumentListProps> = ({
// //   documents,
// //   onRemove,
// //   onNext,
// // }) => (
// //   <div className="mt-6">
// //     <h3 className="text-lg font-semibold text-gray-900 mb-4">
// //       Uploaded Documents
// //     </h3>
// //     <div className="space-y-3">
// //       {documents.map((doc) => (
// //         <div
// //           key={doc.id}
// //           className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
// //         >
// //           <div className="flex items-center space-x-3">
// //             <FileText className="w-8 h-8 text-blue-500" />
// //             <div>
// //               <p className="font-medium text-gray-900">{doc.name}</p>
// //               <p className="text-sm text-gray-500">{doc.size}</p>
// //             </div>
// //           </div>
// //           <button
// //             onClick={() => onRemove(doc.id)}
// //             className="text-red-500 hover:text-red-700"
// //           >
// //             <X className="w-5 h-5" />
// //           </button>
// //         </div>
// //       ))}
// //     </div>
// //     <button
// //       onClick={onNext}
// //       className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
// //     >
// //       Continue to Recipients
// //     </button>
// //   </div>
// // );

// // // Recipients Management Component
// // interface RecipientsManagerProps {
// //   recipients: Recipient[];
// //   setRecipients: React.Dispatch<React.SetStateAction<Recipient[]>>;
// //   onBack: () => void;
// //   onNext: () => void;
// // }

// // const RecipientsManager: React.FC<RecipientsManagerProps> = ({
// //   recipients,
// //   setRecipients,
// //   onBack,
// //   onNext,
// // }) => {
// //   const colors = [
// //     "bg-blue-500",
// //     "bg-green-500",
// //     "bg-purple-500",
// //     "bg-red-500",
// //     "bg-yellow-500",
// //   ];

// //   const addRecipient = () => {
// //     setRecipients((prev) => [
// //       ...prev,
// //       {
// //         email: "",
// //         role: "signer",
// //         color: colors[prev.length % colors.length],
// //       },
// //     ]);
// //   };

// //   const updateRecipient = (
// //     index: number,
// //     field: keyof Recipient,
// //     value: string
// //   ) => {
// //     setRecipients((prev) =>
// //       prev.map((r, i) => (i === index ? { ...r, [field]: value } : r))
// //     );
// //   };

// //   const removeRecipient = (index: number) => {
// //     if (recipients.length > 1) {
// //       setRecipients((prev) => prev.filter((_, i) => i !== index));
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Recipients</h2>

// //       <div className="space-y-4 mb-6">
// //         {recipients.map((recipient, index) => (
// //           <RecipientRow
// //             key={index}
// //             recipient={recipient}
// //             index={index}
// //             canRemove={recipients.length > 1}
// //             onUpdate={updateRecipient}
// //             onRemove={removeRecipient}
// //           />
// //         ))}
// //       </div>

// //       <div className="flex items-center justify-between">
// //         <button
// //           onClick={addRecipient}
// //           className="flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
// //         >
// //           <Users className="w-4 h-4" />
// //           <span>Add Recipient</span>
// //         </button>

// //         <div className="space-x-3">
// //           <button
// //             onClick={onBack}
// //             className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
// //           >
// //             Back
// //           </button>
// //           <button
// //             onClick={onNext}
// //             disabled={recipients.some((r) => !r.email)}
// //             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
// //           >
// //             Prepare Document
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // Individual Recipient Row Component
// // interface RecipientRowProps {
// //   recipient: Recipient;
// //   index: number;
// //   canRemove: boolean;
// //   onUpdate: (index: number, field: keyof Recipient, value: string) => void;
// //   onRemove: (index: number) => void;
// // }

// // const RecipientRow: React.FC<RecipientRowProps> = ({
// //   recipient,
// //   index,
// //   canRemove,
// //   onUpdate,
// //   onRemove,
// // }) => (
// //   <div className="flex items-center space-x-4 p-4 border rounded-lg">
// //     <div className={`w-4 h-4 rounded-full ${recipient.color}`}></div>
// //     <input
// //       type="email"
// //       placeholder="Enter email address"
// //       value={recipient.email}
// //       onChange={(e) => onUpdate(index, "email", e.target.value)}
// //       className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //     />
// //     <select
// //       value={recipient.role}
// //       onChange={(e) =>
// //         onUpdate(index, "role", e.target.value as Recipient["role"])
// //       }
// //       className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //     >
// //       <option value="signer">Signer</option>
// //       <option value="approver">Approver</option>
// //       <option value="viewer">Viewer</option>
// //     </select>
// //     {canRemove && (
// //       <button
// //         onClick={() => onRemove(index)}
// //         className="text-red-500 hover:text-red-700"
// //       >
// //         <X className="w-5 h-5" />
// //       </button>
// //     )}
// //   </div>
// // );

// // // Document Preparation Component
// // interface DocumentPreparationProps {
// //   documents: Document[];
// //   selectedDoc: Document | null;
// //   setSelectedDoc: React.Dispatch<React.SetStateAction<Document | null>>;
// //   recipients: Recipient[];
// //   signatureFields: SignatureField[];
// //   setSignatureFields: React.Dispatch<React.SetStateAction<SignatureField[]>>;
// //   onBack: () => void;
// //   onNext: () => void;
// // }

// // const DocumentPreparation: React.FC<DocumentPreparationProps> = ({
// //   documents,
// //   selectedDoc,
// //   setSelectedDoc,
// //   recipients,
// //   signatureFields,
// //   setSignatureFields,
// //   onBack,
// //   onNext,
// // }) => {
// //   const handleDocumentClick = (
// //     event: React.MouseEvent<HTMLDivElement>,
// //     docElement: HTMLDivElement
// //   ) => {
// //     const rect = docElement.getBoundingClientRect();
// //     const x = ((event.clientX - rect.left) / rect.width) * 100;
// //     const y = ((event.clientY - rect.top) / rect.height) * 100;

// //     const newField: SignatureField = {
// //       id: Date.now() + Math.random(),
// //       x: x,
// //       y: y,
// //       type: "signature",
// //       recipientIndex: 0,
// //       width: 15,
// //       height: 6,
// //     };

// //     setSignatureFields((prev) => [...prev, newField]);
// //   };

// //   const removeField = (fieldId: number) => {
// //     setSignatureFields((prev) => prev.filter((f) => f.id !== fieldId));
// //   };

// //   return (
// //     <div>
// //       <h2 className="text-2xl font-bold text-gray-900 mb-6">
// //         Prepare Document for Signing
// //       </h2>

// //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //         {/* Document List Sidebar */}
// //         <DocumentSidebar
// //           documents={documents}
// //           selectedDoc={selectedDoc}
// //           onSelectDoc={setSelectedDoc}
// //           recipients={recipients}
// //         />

// //         {/* Document Preview */}
// //         <div className="lg:col-span-2">
// //           <DocumentPreview
// //             selectedDoc={selectedDoc}
// //             signatureFields={signatureFields}
// //             recipients={recipients}
// //             onDocumentClick={handleDocumentClick}
// //             onRemoveField={removeField}
// //           />

// //           <div className="flex justify-between mt-6">
// //             <button
// //               onClick={onBack}
// //               className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
// //             >
// //               Back
// //             </button>
// //             <button
// //               onClick={onNext}
// //               disabled={signatureFields.length === 0}
// //               className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
// //             >
// //               Review & Sign
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // Document Sidebar Component
// // interface DocumentSidebarProps {
// //   documents: Document[];
// //   selectedDoc: Document | null;
// //   onSelectDoc: React.Dispatch<React.SetStateAction<Document | null>>;
// //   recipients: Recipient[];
// // }

// // const DocumentSidebar: React.FC<DocumentSidebarProps> = ({
// //   documents,
// //   selectedDoc,
// //   onSelectDoc,
// //   recipients,
// // }) => (
// //   <div className="lg:col-span-1">
// //     <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents</h3>
// //     <div className="space-y-2">
// //       {documents.map((doc) => (
// //         <div
// //           key={doc.id}
// //           onClick={() => onSelectDoc(doc)}
// //           className={`p-3 border rounded-lg cursor-pointer transition-colors ${
// //             selectedDoc?.id === doc.id
// //               ? "border-blue-500 bg-blue-50"
// //               : "border-gray-200 hover:border-gray-300"
// //           }`}
// //         >
// //           <div className="flex items-center space-x-2">
// //             <FileText className="w-5 h-5 text-blue-500" />
// //             <span className="text-sm font-medium truncate">{doc.name}</span>
// //           </div>
// //         </div>
// //       ))}
// //     </div>

// //     <div className="mt-6">
// //       <h4 className="text-md font-semibold text-gray-900 mb-3">Recipients</h4>
// //       <div className="space-y-2">
// //         {recipients.map((recipient, index) => (
// //           <div key={index} className="flex items-center space-x-2 text-sm">
// //             <div className={`w-3 h-3 rounded-full ${recipient.color}`}></div>
// //             <span className="truncate">{recipient.email}</span>
// //             <span className="text-gray-500">({recipient.role})</span>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   </div>
// // );

// // // Document Preview Component
// // interface DocumentPreviewProps {
// //   selectedDoc: Document | null;
// //   signatureFields: SignatureField[];
// //   recipients: Recipient[];
// //   onDocumentClick: (
// //     event: React.MouseEvent<HTMLDivElement>,
// //     docElement: HTMLDivElement
// //   ) => void;
// //   onRemoveField: (fieldId: number) => void;
// // }

// // const DocumentPreview: React.FC<DocumentPreviewProps> = ({
// //   selectedDoc,
// //   signatureFields,
// //   recipients,
// //   onDocumentClick,
// //   onRemoveField,
// // }) => {
// //   if (!selectedDoc) {
// //     return (
// //       <div className="h-96 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
// //         <div className="text-center text-gray-500">
// //           <Eye className="w-12 h-12 mx-auto mb-2" />
// //           <p>Select a document to preview and add signature fields</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="relative">
// //       <h3 className="text-lg font-semibold text-gray-900 mb-4">
// //         Click to place signature fields
// //       </h3>
// //       <div
// //         className="relative border border-gray-300 rounded-lg overflow-hidden bg-white cursor-crosshair"
// //         onClick={(e) => onDocumentClick(e, e.currentTarget)}
// //       >
// //         <div className="w-full h-96 bg-gray-100 flex items-center justify-center relative">
// //           <div className="text-center">
// //             <FileText className="w-16 h-16 text-gray-400 mx-auto mb-2" />
// //             <p className="text-gray-600">{selectedDoc.name}</p>
// //             <p className="text-sm text-gray-500">Document Preview</p>
// //           </div>

// //           {/* Signature Fields */}
// //           {signatureFields.map((field) => (
// //             <SignatureField
// //               key={field.id}
// //               field={field}
// //               recipients={recipients}
// //               onRemove={onRemoveField}
// //             />
// //           ))}
// //         </div>
// //       </div>

// //       <div className="mt-4 text-sm text-gray-600">
// //         <MousePointer className="w-4 h-4 inline mr-1" />
// //         Click anywhere on the document to add signature fields
// //       </div>
// //     </div>
// //   );
// // };

// // // Signature Field Component
// // interface SignatureFieldProps {
// //   field: SignatureField;
// //   recipients: Recipient[];
// //   onRemove: (fieldId: number) => void;
// // }

// // const SignatureField: React.FC<SignatureFieldProps> = ({
// //   field,
// //   recipients,
// //   onRemove,
// // }) => (
// //   <div
// //     className={`absolute border-2 border-dashed ${recipients[field.recipientIndex]?.color || "border-blue-500"} rounded cursor-pointer group`}
// //     style={{
// //       left: `${field.x}%`,
// //       top: `${field.y}%`,
// //       width: `${field.width}%`,
// //       height: `${field.height}%`,
// //     }}
// //   >
// //     <div className="w-full h-full bg-blue-100/50 flex items-center justify-center text-xs font-medium text-blue-700">
// //       {field.type}
// //     </div>
// //     <button
// //       onClick={(e) => {
// //         e.stopPropagation();
// //         onRemove(field.id);
// //       }}
// //       className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
// //     >
// //       <X className="w-3 h-3" />
// //     </button>
// //   </div>
// // );

// // // Signature Canvas Component
// // interface SignatureCanvasProps {
// //   canvasRef: React.RefObject<HTMLCanvasElement>;
// //   currentSignature: string;
// //   setCurrentSignature: React.Dispatch<React.SetStateAction<string>>;
// // }

// // const SignatureCanvas: React.FC<SignatureCanvasProps> = ({
// //   canvasRef,
// //   currentSignature,
// //   setCurrentSignature,
// // }) => {
// //   const [isDrawing, setIsDrawing] = useState<boolean>(false);
// //   const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(
// //     null
// //   );

// //   const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
// //     setIsDrawing(true);
// //     const canvas = canvasRef.current;
// //     if (!canvas) return;

// //     const ctx = canvas.getContext("2d");
// //     if (!ctx) return;

// //     const rect = canvas.getBoundingClientRect();
// //     const x = event.clientX - rect.left;
// //     const y = event.clientY - rect.top;

// //     ctx.strokeStyle = "#000";
// //     ctx.lineWidth = 2;
// //     ctx.lineCap = "round";
// //     ctx.lineJoin = "round";

// //     ctx.beginPath();
// //     ctx.moveTo(x, y);
// //     setLastPoint({ x, y });
// //   };

// //   const drawSignature = (event: React.MouseEvent<HTMLCanvasElement>) => {
// //     if (!isDrawing || !lastPoint) return;

// //     const canvas = canvasRef.current;
// //     if (!canvas) return;

// //     const rect = canvas.getBoundingClientRect();
// //     const ctx = canvas.getContext("2d");
// //     if (!ctx) return;

// //     const x = event.clientX - rect.left;
// //     const y = event.clientY - rect.top;

// //     ctx.beginPath();
// //     ctx.moveTo(lastPoint.x, lastPoint.y);
// //     ctx.lineTo(x, y);
// //     ctx.stroke();

// //     setLastPoint({ x, y });
// //   };

// //   const finishDrawing = () => {
// //     if (!isDrawing) return;
// //     setIsDrawing(false);
// //     setLastPoint(null);

// //     const canvas = canvasRef.current;
// //     if (canvas) {
// //       setCurrentSignature(canvas.toDataURL());
// //     }
// //   };

// //   const clearSignature = () => {
// //     const canvas = canvasRef.current;
// //     if (!canvas) return;

// //     const ctx = canvas.getContext("2d");
// //     if (ctx) {
// //       ctx.clearRect(0, 0, canvas.width, canvas.height);
// //       setCurrentSignature("");
// //     }
// //   };

// //   return (
// //     <div className="border border-gray-300 rounded-lg p-4 mb-4">
// //       <canvas
// //         ref={canvasRef}
// //         width={400}
// //         height={150}
// //         className="w-full border border-gray-200 rounded cursor-crosshair"
// //         onMouseDown={startDrawing}
// //         onMouseMove={drawSignature}
// //         onMouseUp={finishDrawing}
// //         onMouseLeave={finishDrawing}
// //       />
// //       <div className="flex justify-between mt-3">
// //         <button
// //           onClick={clearSignature}
// //           className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
// //         >
// //           Clear
// //         </button>
// //         <p className="text-sm text-gray-500 self-center">
// //           Draw your signature above
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // // Document Summary Component
// // interface DocumentSummaryProps {
// //   documents: Document[];
// //   recipients: Recipient[];
// //   signatureFields: SignatureField[];
// // }

// // const DocumentSummary: React.FC<DocumentSummaryProps> = ({
// //   documents,
// //   recipients,
// //   signatureFields,
// // }) => (
// //   <div className="bg-gray-50 rounded-lg p-4">
// //     <h4 className="font-semibold text-gray-900 mb-3">Document Summary</h4>
// //     <div className="space-y-2 text-sm">
// //       <p>
// //         <span className="font-medium">Documents:</span> {documents.length}
// //       </p>
// //       <p>
// //         <span className="font-medium">Recipients:</span> {recipients.length}
// //       </p>
// //       <p>
// //         <span className="font-medium">Signature Fields:</span>{" "}
// //         {signatureFields.length}
// //       </p>
// //     </div>
// //   </div>
// // );

// // // Sign Preview Component
// // interface SignPreviewProps {
// //   selectedDoc: Document | null;
// //   signatureFields: SignatureField[];
// // }

// // const SignPreview: React.FC<SignPreviewProps> = ({
// //   selectedDoc,
// //   signatureFields,
// // }) => {
// //   if (!selectedDoc) return null;

// //   return (
// //     <div className="border border-gray-300 rounded-lg overflow-hidden">
// //       <div className="w-full h-64 bg-gray-100 flex items-center justify-center relative">
// //         <div className="text-center">
// //           <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
// //           <p className="text-gray-600 text-sm">{selectedDoc.name}</p>
// //         </div>

// //         {/* Preview signature fields with signatures */}
// //         {signatureFields.map((field) => (
// //           <div
// //             key={field.id}
// //             className="absolute border border-green-500 rounded bg-green-100/80 flex items-center justify-center text-xs font-medium text-green-700"
// //             style={{
// //               left: `${field.x}%`,
// //               top: `${field.y}%`,
// //               width: `${field.width}%`,
// //               height: `${field.height}%`,
// //             }}
// //           >
// //             ✓ Signed
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // // Signing Step Component
// // interface SigningStepProps {
// //   documents: Document[];
// //   recipients: Recipient[];
// //   signatureFields: SignatureField[];
// //   selectedDoc: Document | null;
// //   currentSignature: string;
// //   setCurrentSignature: React.Dispatch<React.SetStateAction<string>>;
// //   onBack: () => void;
// // }

// // const SigningStep: React.FC<SigningStepProps> = ({
// //   documents,
// //   recipients,
// //   signatureFields,
// //   selectedDoc,
// //   currentSignature,
// //   setCurrentSignature,
// //   onBack,
// // }) => {
// //   const canvasRef = useRef<HTMLCanvasElement>(null);

// //   const handleSend = () => {
// //     alert(
// //       "Documents sent successfully! All recipients will receive email notifications."
// //     );
// //   };

// //   const handleDownload = () => {
// //     alert("Signed document downloaded!");
// //   };

// //   return (
// //     <div>
// //       <h2 className="text-2xl font-bold text-gray-900 mb-6">
// //         Sign Your Documents
// //       </h2>

// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// //         {/* Signature Creation */}
// //         <div>
// //           <h3 className="text-lg font-semibold text-gray-900 mb-4">
// //             Create Your Signature
// //           </h3>

// //           <SignatureCanvas
// //             canvasRef={canvasRef}
// //             currentSignature={currentSignature}
// //             setCurrentSignature={setCurrentSignature}
// //           />

// //           <DocumentSummary
// //             documents={documents}
// //             recipients={recipients}
// //             signatureFields={signatureFields}
// //           />
// //         </div>

// //         {/* Preview */}
// //         <div>
// //           <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>

// //           <SignPreview
// //             selectedDoc={selectedDoc}
// //             signatureFields={signatureFields}
// //           />

// //           <div className="mt-6 space-y-3">
// //             <button
// //               onClick={handleSend}
// //               disabled={!currentSignature}
// //               className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
// //             >
// //               Send for Signatures
// //             </button>

// //             <button
// //               onClick={handleDownload}
// //               className="w-full px-6 py-3 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
// //             >
// //               <Download className="w-4 h-4 inline mr-2" />
// //               Download Signed Copy
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="flex justify-between mt-8">
// //         <button
// //           onClick={onBack}
// //           className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
// //         >
// //           Back
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // // Features Section Component
// // const FeaturesSection: React.FC = () => (
// //   <div className="max-w-7xl mx-auto px-4 py-12">
// //     <div className="text-center mb-12">
// //       <h2 className="text-3xl font-bold text-gray-900 mb-4">
// //         Why Choose SignFlow?
// //       </h2>
// //       <p className="text-lg text-gray-600">
// //         Built for speed, security, and simplicity
// //       </p>
// //     </div>

// //     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// //       <FeatureCard
// //         icon={Upload}
// //         iconColor="text-blue-600"
// //         bgColor="bg-blue-100"
// //         title="Lightning Fast Upload"
// //         description="Drag & drop multiple documents instantly. No waiting, no complex menus."
// //       />
// //       <FeatureCard
// //         icon={MousePointer}
// //         iconColor="text-green-600"
// //         bgColor="bg-green-100"
// //         title="One-Click Placement"
// //         description="Place signature fields exactly where you need them with a single click."
// //       />
// //       <FeatureCard
// //         icon={Send}
// //         iconColor="text-purple-600"
// //         bgColor="bg-purple-100"
// //         title="Smart Delivery"
// //         description="Automatic reminders and real-time tracking. Everyone stays in the loop."
// //       />
// //     </div>
// //   </div>
// // );

// // // Feature Card Component
// // interface FeatureCardProps {
// //   icon: React.ComponentType<any>;
// //   iconColor: string;
// //   bgColor: string;
// //   title: string;
// //   description: string;
// // }

// // const FeatureCard: React.FC<FeatureCardProps> = ({
// //   icon: Icon,
// //   iconColor,
// //   bgColor,
// //   title,
// //   description,
// // }) => (
// //   <div className="text-center p-6 bg-white rounded-xl shadow-sm">
// //     <div
// //       className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center mx-auto mb-4`}
// //     >
// //       <Icon className={`w-6 h-6 ${iconColor}`} />
// //     </div>
// //     <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
// //     <p className="text-gray-600">{description}</p>
// //   </div>
// // );

// // // Main App Component
// // const SignFlow: React.FC = () => {
// //   const [currentStep, setCurrentStep] = useState<StepId>("upload");
// //   const [documents, setDocuments] = useState<Document[]>([]);
// //   const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
// //   const [recipients, setRecipients] = useState<Recipient[]>([
// //     {
// //       email: "",
// //       role: "signer",
// //       color: "bg-blue-500",
// //     },
// //   ]);
// //   const [signatureFields, setSignatureFields] = useState<SignatureField[]>([]);
// //   const [currentSignature, setCurrentSignature] = useState<string>("");

// //   const steps: Step[] = [
// //     { id: "upload", title: "Upload Documents", icon: Upload },
// //     { id: "recipients", title: "Add Recipients", icon: Users },
// //     { id: "prepare", title: "Prepare Document", icon: Edit3 },
// //     { id: "sign", title: "Sign & Send", icon: Send },
// //   ];

// //   const renderStepContent = (): React.ReactNode => {
// //     switch (currentStep) {
// //       case "upload":
// //         return (
// //           <DocumentUpload
// //             documents={documents}
// //             setDocuments={setDocuments}
// //             onNext={() => setCurrentStep("recipients")}
// //           />
// //         );
// //       case "recipients":
// //         return (
// //           <RecipientsManager
// //             recipients={recipients}
// //             setRecipients={setRecipients}
// //             onBack={() => setCurrentStep("upload")}
// //             onNext={() => {
// //               // Auto-select first document if none selected
// //               if (!selectedDoc && documents.length > 0) {
// //                 setSelectedDoc(documents[0]);
// //               }
// //               setCurrentStep("prepare");
// //             }}
// //           />
// //         );
// //       case "prepare":
// //         return (
// //           <DocumentPreparation
// //             documents={documents}
// //             selectedDoc={selectedDoc}
// //             setSelectedDoc={setSelectedDoc}
// //             recipients={recipients}
// //             signatureFields={signatureFields}
// //             setSignatureFields={setSignatureFields}
// //             onBack={() => setCurrentStep("recipients")}
// //             onNext={() => {
// //               // Ensure we have a selected document for signing
// //               if (!selectedDoc && documents.length > 0) {
// //                 setSelectedDoc(documents[0]);
// //               }
// //               setCurrentStep("sign");
// //             }}
// //           />
// //         );
// //       case "sign":
// //         return (
// //           <SigningStep
// //             documents={documents}
// //             recipients={recipients}
// //             signatureFields={signatureFields}
// //             selectedDoc={selectedDoc || documents[0] || null}
// //             currentSignature={currentSignature}
// //             setCurrentSignature={setCurrentSignature}
// //             onBack={() => setCurrentStep("prepare")}
// //           />
// //         );
// //       default:
// //         return null;
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
// //       <Header />

// //       {/* Progress Steps */}
// //       <div className="max-w-4xl mx-auto px-4 py-6">
// //         <ProgressSteps currentStep={currentStep} steps={steps} />

// //         {/* Step Content */}
// //         <div className="bg-white rounded-xl shadow-lg p-6">
// //           {renderStepContent()}
// //         </div>
// //       </div>

// //       <FeaturesSection />
// //     </div>
// //   );
// // };

// // export default SignFlow;

// import React, { useState, useRef, useCallback } from "react";
// import {
//   Upload,
//   FileText,
//   Send,
//   Users,
//   Check,
//   X,
//   Download,
//   Eye,
//   Edit3,
//   MousePointer,
// } from "lucide-react";

// // Type Definitions
// interface èDocument {
//   id: number;
//   name: string;
//   size: string;
//   type: string;
//   file: File;
//   url: string;
// }

// interface Recipient {
//   email: string;
//   role: "signer" | "approver" | "viewer";
//   color: string;
// }

// interface SignatureField {
//   id: number;
//   x: number;
//   y: number;
//   type: string;
//   recipientIndex: number;
//   width: number;
//   height: number;
// }

// type StepId = "upload" | "recipients" | "prepare" | "sign";

// interface Step {
//   id: StepId;
//   title: string;
//   icon: React.ComponentType<any>;
// }

// // Header Component
// const Header: React.FC = () => (
//   <header className="bg-white shadow-sm border-b">
//     <div className="max-w-7xl mx-auto px-4 py-4">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-3">
//           <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
//             <FileText className="w-5 h-5 text-white" />
//           </div>
//           <h1 className="text-2xl font-bold text-gray-900">SignFlow</h1>
//         </div>
//         <div className="text-sm text-gray-500">Fast • Secure • Simple</div>
//       </div>
//     </div>
//   </header>
// );

// // Progress Steps Component
// interface ProgressStepsProps {
//   currentStep: StepId;
//   steps: Step[];
// }

// const ProgressSteps: React.FC<ProgressStepsProps> = ({
//   currentStep,
//   steps,
// }) => (
//   <div className="flex items-center justify-between mb-8">
//     {steps.map((step, index) => {
//       const Icon = step.icon;
//       const isActive = step.id === currentStep;
//       const isCompleted = steps.findIndex((s) => s.id === currentStep) > index;

//       return (
//         <div key={step.id} className="flex items-center">
//           <div
//             className={`flex items-center justify-center w-10 h-10 rounded-full ${
//               isActive
//                 ? "bg-blue-600 text-white"
//                 : isCompleted
//                   ? "bg-green-500 text-white"
//                   : "bg-gray-200 text-gray-500"
//             }`}
//           >
//             {isCompleted ? (
//               <Check className="w-5 h-5" />
//             ) : (
//               <Icon className="w-5 h-5" />
//             )}
//           </div>
//           <span
//             className={`ml-2 text-sm font-medium ${
//               isActive
//                 ? "text-blue-600"
//                 : isCompleted
//                   ? "text-green-600"
//                   : "text-gray-500"
//             }`}
//           >
//             {step.title}
//           </span>
//           {index < steps.length - 1 && (
//             <div
//               className={`w-16 h-0.5 mx-4 ${
//                 isCompleted ? "bg-green-500" : "bg-gray-200"
//               }`}
//             />
//           )}
//         </div>
//       );
//     })}
//   </div>
// );

// // Document Upload Component
// interface DocumentUploadProps {
//   documents: Document[];
//   setDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
//   onNext: () => void;
// }

// const DocumentUpload: React.FC<DocumentUploadProps> = ({
//   documents,
//   setDocuments,
//   onNext,
// }) => {
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(event.target.files || []);
//     const newDocs: Document[] = files.map((file) => ({
//       id: Date.now() + Math.random(),
//       name: file.name,
//       size: (file.size / 1024 / 1024).toFixed(2) + " MB",
//       type: file.type,
//       file: file,
//       url: URL.createObjectURL(file),
//     }));
//     setDocuments((prev) => [...prev, ...newDocs]);
//   };

//   const removeDocument = (docId: number) => {
//     setDocuments((prev) => prev.filter((d) => d.id !== docId));
//   };

//   return (
//     <div className="text-center">
//       <h2 className="text-2xl font-bold text-gray-900 mb-6">
//         Upload Your Documents
//       </h2>

//       <div
//         onClick={() => fileInputRef.current?.click()}
//         className="border-2 border-dashed border-blue-300 rounded-xl p-12 hover:border-blue-400 transition-colors cursor-pointer bg-blue-50/50"
//       >
//         <Upload className="w-16 h-16 text-blue-500 mx-auto mb-4" />
//         <p className="text-lg text-gray-700 mb-2">
//           Drag & drop files here or click to browse
//         </p>
//         <p className="text-sm text-gray-500">
//           PDF, Word, or image files supported
//         </p>
//       </div>

//       <input
//         ref={fileInputRef}
//         type="file"
//         multiple
//         accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
//         onChange={handleFileUpload}
//         className="hidden"
//       />

//       {documents.length > 0 && (
//         <DocumentList
//           documents={documents}
//           onRemove={removeDocument}
//           onNext={onNext}
//         />
//       )}
//     </div>
//   );
// };

// // Document List Component
// interface DocumentListProps {
//   documents: Document[];
//   onRemove: (docId: number) => void;
//   onNext: () => void;
// }

// const DocumentList: React.FC<DocumentListProps> = ({
//   documents,
//   onRemove,
//   onNext,
// }) => (
//   <div className="mt-6">
//     <h3 className="text-lg font-semibold text-gray-900 mb-4">
//       Uploaded Documents
//     </h3>
//     <div className="space-y-3">
//       {documents.map((doc) => (
//         <div
//           key={doc.id}
//           className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
//         >
//           <div className="flex items-center space-x-3">
//             <FileText className="w-8 h-8 text-blue-500" />
//             <div>
//               <p className="font-medium text-gray-900">{doc.name}</p>
//               <p className="text-sm text-gray-500">{doc.size}</p>
//             </div>
//           </div>
//           <button
//             onClick={() => onRemove(doc.id)}
//             className="text-red-500 hover:text-red-700"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>
//       ))}
//     </div>
//     <button
//       onClick={onNext}
//       className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
//     >
//       Continue to Recipients
//     </button>
//   </div>
// );

// // Recipients Management Component
// interface RecipientsManagerProps {
//   recipients: Recipient[];
//   setRecipients: React.Dispatch<React.SetStateAction<Recipient[]>>;
//   onBack: () => void;
//   onNext: () => void;
// }

// const RecipientsManager: React.FC<RecipientsManagerProps> = ({
//   recipients,
//   setRecipients,
//   onBack,
//   onNext,
// }) => {
//   const colors = [
//     "bg-blue-500",
//     "bg-green-500",
//     "bg-purple-500",
//     "bg-red-500",
//     "bg-yellow-500",
//   ];

//   const addRecipient = () => {
//     setRecipients((prev) => [
//       ...prev,
//       {
//         email: "",
//         role: "signer",
//         color: colors[prev.length % colors.length],
//       },
//     ]);
//   };

//   const updateRecipient = (
//     index: number,
//     field: keyof Recipient,
//     value: string
//   ) => {
//     setRecipients((prev) =>
//       prev.map((r, i) => (i === index ? { ...r, [field]: value } : r))
//     );
//   };

//   const removeRecipient = (index: number) => {
//     if (recipients.length > 1) {
//       setRecipients((prev) => prev.filter((_, i) => i !== index));
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Recipients</h2>

//       <div className="space-y-4 mb-6">
//         {recipients.map((recipient, index) => (
//           <RecipientRow
//             key={index}
//             recipient={recipient}
//             index={index}
//             canRemove={recipients.length > 1}
//             onUpdate={updateRecipient}
//             onRemove={removeRecipient}
//           />
//         ))}
//       </div>

//       <div className="flex items-center justify-between">
//         <button
//           onClick={addRecipient}
//           className="flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
//         >
//           <Users className="w-4 h-4" />
//           <span>Add Recipient</span>
//         </button>

//         <div className="space-x-3">
//           <button
//             onClick={onBack}
//             className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             Back
//           </button>
//           <button
//             onClick={onNext}
//             disabled={recipients.some((r) => !r.email)}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
//           >
//             Prepare Document
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Individual Recipient Row Component
// interface RecipientRowProps {
//   recipient: Recipient;
//   index: number;
//   canRemove: boolean;
//   onUpdate: (index: number, field: keyof Recipient, value: string) => void;
//   onRemove: (index: number) => void;
// }

// const RecipientRow: React.FC<RecipientRowProps> = ({
//   recipient,
//   index,
//   canRemove,
//   onUpdate,
//   onRemove,
// }) => (
//   <div className="flex items-center space-x-4 p-4 border rounded-lg">
//     <div className={`w-4 h-4 rounded-full ${recipient.color}`}></div>
//     <input
//       type="email"
//       placeholder="Enter email address"
//       value={recipient.email}
//       onChange={(e) => onUpdate(index, "email", e.target.value)}
//       className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//     />
//     <select
//       value={recipient.role}
//       onChange={(e) =>
//         onUpdate(index, "role", e.target.value as Recipient["role"])
//       }
//       className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//     >
//       <option value="signer">Signer</option>
//       <option value="approver">Approver</option>
//       <option value="viewer">Viewer</option>
//     </select>
//     {canRemove && (
//       <button
//         onClick={() => onRemove(index)}
//         className="text-red-500 hover:text-red-700"
//       >
//         <X className="w-5 h-5" />
//       </button>
//     )}
//   </div>
// );

// // Document Preparation Component
// interface DocumentPreparationProps {
//   documents: Document[];
//   selectedDoc: Document | null;
//   setSelectedDoc: React.Dispatch<React.SetStateAction<Document | null>>;
//   recipients: Recipient[];
//   signatureFields: SignatureField[];
//   setSignatureFields: React.Dispatch<React.SetStateAction<SignatureField[]>>;
//   onBack: () => void;
//   onNext: () => void;
// }

// const DocumentPreparation: React.FC<DocumentPreparationProps> = ({
//   documents,
//   selectedDoc,
//   setSelectedDoc,
//   recipients,
//   signatureFields,
//   setSignatureFields,
//   onBack,
//   onNext,
// }) => {
//   const handleDocumentClick = (
//     event: React.MouseEvent<HTMLDivElement>,
//     docElement: HTMLDivElement
//   ) => {
//     const rect = docElement.getBoundingClientRect();
//     const x = ((event.clientX - rect.left) / rect.width) * 100;
//     const y = ((event.clientY - rect.top) / rect.height) * 100;

//     const newField: SignatureField = {
//       id: Date.now() + Math.random(),
//       x: x,
//       y: y,
//       type: "signature",
//       recipientIndex: 0,
//       width: 15,
//       height: 6,
//     };

//     setSignatureFields((prev) => [...prev, newField]);
//   };

//   const removeField = (fieldId: number) => {
//     setSignatureFields((prev) => prev.filter((f) => f.id !== fieldId));
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-gray-900 mb-6">
//         Prepare Document for Signing
//       </h2>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Document List Sidebar */}
//         <DocumentSidebar
//           documents={documents}
//           selectedDoc={selectedDoc}
//           onSelectDoc={setSelectedDoc}
//           recipients={recipients}
//         />

//         {/* Document Preview */}
//         <div className="lg:col-span-2">
//           <DocumentPreview
//             selectedDoc={selectedDoc}
//             signatureFields={signatureFields}
//             recipients={recipients}
//             onDocumentClick={handleDocumentClick}
//             onRemoveField={removeField}
//           />

//           <div className="flex justify-between mt-6">
//             <button
//               onClick={onBack}
//               className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               Back
//             </button>
//             <button
//               onClick={onNext}
//               disabled={signatureFields.length === 0}
//               className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
//             >
//               Review & Sign
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Document Sidebar Component
// interface DocumentSidebarProps {
//   documents: Document[];
//   selectedDoc: Document | null;
//   onSelectDoc: React.Dispatch<React.SetStateAction<Document | null>>;
//   recipients: Recipient[];
// }

// const DocumentSidebar: React.FC<DocumentSidebarProps> = ({
//   documents,
//   selectedDoc,
//   onSelectDoc,
//   recipients,
// }) => (
//   <div className="lg:col-span-1">
//     <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents</h3>
//     <div className="space-y-2">
//       {documents.map((doc) => (
//         <div
//           key={doc.id}
//           onClick={() => onSelectDoc(doc)}
//           className={`p-3 border rounded-lg cursor-pointer transition-colors ${
//             selectedDoc?.id === doc.id
//               ? "border-blue-500 bg-blue-50"
//               : "border-gray-200 hover:border-gray-300"
//           }`}
//         >
//           <div className="flex items-center space-x-2">
//             <FileText className="w-5 h-5 text-blue-500" />
//             <span className="text-sm font-medium truncate">{doc.name}</span>
//           </div>
//         </div>
//       ))}
//     </div>

//     <div className="mt-6">
//       <h4 className="text-md font-semibold text-gray-900 mb-3">Recipients</h4>
//       <div className="space-y-2">
//         {recipients.map((recipient, index) => (
//           <div key={index} className="flex items-center space-x-2 text-sm">
//             <div className={`w-3 h-3 rounded-full ${recipient.color}`}></div>
//             <span className="truncate">{recipient.email}</span>
//             <span className="text-gray-500">({recipient.role})</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// );

// // Document Preview Component
// interface DocumentPreviewProps {
//   selectedDoc: Document | null;
//   signatureFields: SignatureField[];
//   recipients: Recipient[];
//   onDocumentClick: (
//     event: React.MouseEvent<HTMLDivElement>,
//     docElement: HTMLDivElement
//   ) => void;
//   onRemoveField: (fieldId: number) => void;
// }

// const DocumentPreview: React.FC<DocumentPreviewProps> = ({
//   selectedDoc,
//   signatureFields,
//   recipients,
//   onDocumentClick,
//   onRemoveField,
// }) => {
//   if (!selectedDoc) {
//     return (
//       <div className="h-96 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
//         <div className="text-center text-gray-500">
//           <Eye className="w-12 h-12 mx-auto mb-2" />
//           <p>Select a document to preview and add signature fields</p>
//         </div>
//       </div>
//     );
//   }

//   const renderDocumentContent = () => {
//     if (selectedDoc.type.includes("image")) {
//       return (
//         <img
//           src={selectedDoc.url}
//           alt={selectedDoc.name}
//           className="max-w-full max-h-full object-contain"
//         />
//       );
//     } else if (selectedDoc.type.includes("pdf")) {
//       return (
//         <div className="text-center">
//           <FileText className="w-16 h-16 text-gray-400 mx-auto mb-2" />
//           <p className="text-gray-600">{selectedDoc.name}</p>
//           <p className="text-sm text-gray-500">PDF Preview</p>
//           <p className="text-xs text-gray-400 mt-2">
//             Click to place signature fields
//           </p>
//         </div>
//       );
//     } else {
//       return (
//         <div className="text-center">
//           <FileText className="w-16 h-16 text-gray-400 mx-auto mb-2" />
//           <p className="text-gray-600">{selectedDoc.name}</p>
//           <p className="text-sm text-gray-500">Document Preview</p>
//           <p className="text-xs text-gray-400 mt-2">
//             Click to place signature fields
//           </p>
//         </div>
//       );
//     }
//   };

//   return (
//     <div className="relative">
//       <h3 className="text-lg font-semibold text-gray-900 mb-4">
//         Click to place signature fields
//       </h3>
//       <div
//         className="relative border border-gray-300 rounded-lg overflow-hidden bg-white cursor-crosshair"
//         onClick={(e) => onDocumentClick(e, e.currentTarget)}
//       >
//         <div className="w-full h-96 bg-gray-100 flex items-center justify-center relative">
//           {renderDocumentContent()}

//           {/* Signature Fields */}
//           {signatureFields.map((field) => (
//             <SignatureField
//               key={field.id}
//               field={field}
//               recipients={recipients}
//               onRemove={onRemoveField}
//             />
//           ))}
//         </div>
//       </div>

//       <div className="mt-4 text-sm text-gray-600">
//         <MousePointer className="w-4 h-4 inline mr-1" />
//         Click anywhere on the document to add signature fields
//       </div>
//     </div>
//   );
// };

// // Signature Field Component
// interface SignatureFieldProps {
//   field: SignatureField;
//   recipients: Recipient[];
//   onRemove: (fieldId: number) => void;
// }

// const SignatureField: React.FC<SignatureFieldProps> = ({
//   field,
//   recipients,
//   onRemove,
// }) => (
//   <div
//     className={`absolute border-2 border-dashed ${recipients[field.recipientIndex]?.color || "border-blue-500"} rounded cursor-pointer group`}
//     style={{
//       left: `${field.x}%`,
//       top: `${field.y}%`,
//       width: `${field.width}%`,
//       height: `${field.height}%`,
//     }}
//   >
//     <div className="w-full h-full bg-blue-100/50 flex items-center justify-center text-xs font-medium text-blue-700">
//       {field.type}
//     </div>
//     <button
//       onClick={(e) => {
//         e.stopPropagation();
//         onRemove(field.id);
//       }}
//       className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
//     >
//       <X className="w-3 h-3" />
//     </button>
//   </div>
// );

// // Signature Canvas Component
// interface SignatureCanvasProps {
//   canvasRef: React.RefObject<HTMLCanvasElement>;
//   currentSignature: string;
//   setCurrentSignature: React.Dispatch<React.SetStateAction<string>>;
// }

// const SignatureCanvas: React.FC<SignatureCanvasProps> = ({
//   canvasRef,
//   currentSignature,
//   setCurrentSignature,
// }) => {
//   const [isDrawing, setIsDrawing] = useState<boolean>(false);
//   const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(
//     null
//   );

//   const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
//     setIsDrawing(true);
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const rect = canvas.getBoundingClientRect();
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;

//     ctx.strokeStyle = "#000";
//     ctx.lineWidth = 2;
//     ctx.lineCap = "round";
//     ctx.lineJoin = "round";

//     ctx.beginPath();
//     ctx.moveTo(x, y);
//     setLastPoint({ x, y });
//   };

//   const drawSignature = (event: React.MouseEvent<HTMLCanvasElement>) => {
//     if (!isDrawing || !lastPoint) return;

//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const rect = canvas.getBoundingClientRect();
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;

//     ctx.beginPath();
//     ctx.moveTo(lastPoint.x, lastPoint.y);
//     ctx.lineTo(x, y);
//     ctx.stroke();

//     setLastPoint({ x, y });
//   };

//   const finishDrawing = () => {
//     if (!isDrawing) return;
//     setIsDrawing(false);
//     setLastPoint(null);

//     const canvas = canvasRef.current;
//     if (canvas) {
//       setCurrentSignature(canvas.toDataURL());
//     }
//   };

//   const clearSignature = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (ctx) {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       setCurrentSignature("");
//     }
//   };

//   return (
//     <div className="border border-gray-300 rounded-lg p-4 mb-4">
//       <canvas
//         ref={canvasRef}
//         width={400}
//         height={150}
//         className="w-full border border-gray-200 rounded cursor-crosshair"
//         onMouseDown={startDrawing}
//         onMouseMove={drawSignature}
//         onMouseUp={finishDrawing}
//         onMouseLeave={finishDrawing}
//       />
//       <div className="flex justify-between mt-3">
//         <button
//           onClick={clearSignature}
//           className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//         >
//           Clear
//         </button>
//         <p className="text-sm text-gray-500 self-center">
//           Draw your signature above
//         </p>
//       </div>
//     </div>
//   );
// };

// // Document Summary Component
// interface DocumentSummaryProps {
//   documents: Document[];
//   recipients: Recipient[];
//   signatureFields: SignatureField[];
// }

// const DocumentSummary: React.FC<DocumentSummaryProps> = ({
//   documents,
//   recipients,
//   signatureFields,
// }) => (
//   <div className="bg-gray-50 rounded-lg p-4">
//     <h4 className="font-semibold text-gray-900 mb-3">Document Summary</h4>
//     <div className="space-y-2 text-sm">
//       <p>
//         <span className="font-medium">Documents:</span> {documents.length}
//       </p>
//       <p>
//         <span className="font-medium">Recipients:</span> {recipients.length}
//       </p>
//       <p>
//         <span className="font-medium">Signature Fields:</span>{" "}
//         {signatureFields.length}
//       </p>
//     </div>
//   </div>
// );

// // Sign Preview Component
// interface SignPreviewProps {
//   selectedDoc: Document | null;
//   signatureFields: SignatureField[];
//   currentSignature: string;
// }

// const SignPreview: React.FC<SignPreviewProps> = ({
//   selectedDoc,
//   signatureFields,
//   currentSignature,
// }) => {
//   if (!selectedDoc) return null;

//   const renderDocumentContent = () => {
//     if (selectedDoc.type.includes("image")) {
//       return (
//         <img
//           src={selectedDoc.url}
//           alt={selectedDoc.name}
//           className="max-w-full max-h-full object-contain"
//         />
//       );
//     } else {
//       return (
//         <div className="text-center">
//           <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
//           <p className="text-gray-600 text-sm">{selectedDoc.name}</p>
//           <p className="text-xs text-gray-400">Signed Document Preview</p>
//         </div>
//       );
//     }
//   };

//   return (
//     <div className="border border-gray-300 rounded-lg overflow-hidden">
//       <div className="w-full h-64 bg-gray-100 flex items-center justify-center relative">
//         {renderDocumentContent()}

//         {/* Preview signature fields with actual signatures */}
//         {signatureFields.map((field) => (
//           <div
//             key={field.id}
//             className="absolute border border-green-500 rounded bg-white flex items-center justify-center text-xs font-medium overflow-hidden"
//             style={{
//               left: `${field.x}%`,
//               top: `${field.y}%`,
//               width: `${field.width}%`,
//               height: `${field.height}%`,
//             }}
//           >
//             {currentSignature ? (
//               <img
//                 src={currentSignature}
//                 alt="Signature"
//                 className="w-full h-full object-contain"
//               />
//             ) : (
//               <span className="text-green-700">✓ Ready to Sign</span>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Signing Step Component
// interface SigningStepProps {
//   documents: Document[];
//   recipients: Recipient[];
//   signatureFields: SignatureField[];
//   selectedDoc: Document | null;
//   currentSignature: string;
//   setCurrentSignature: React.Dispatch<React.SetStateAction<string>>;
//   onBack: () => void;
// }

// const SigningStep: React.FC<SigningStepProps> = ({
//   documents,
//   recipients,
//   signatureFields,
//   selectedDoc,
//   currentSignature,
//   setCurrentSignature,
//   onBack,
// }) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   const createSignedDocument = (): string => {
//     // Create a canvas for the signed document
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");
//     if (!ctx || !selectedDoc) return "";

//     canvas.width = 800;
//     canvas.height = 1000;

//     // White background
//     ctx.fillStyle = "#ffffff";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     // Document content
//     ctx.fillStyle = "#000000";
//     ctx.font = "16px Arial";
//     ctx.fillText(selectedDoc.name, 50, 50);
//     ctx.fillText("Document Content Area", 50, 100);

//     // Add signature fields with actual signatures
//     if (currentSignature) {
//       signatureFields.forEach((field) => {
//         const img = new Image();
//         img.onload = () => {
//           const x = (field.x / 100) * canvas.width;
//           const y = (field.y / 100) * canvas.height;
//           const width = (field.width / 100) * canvas.width;
//           const height = (field.height / 100) * canvas.height;
//           ctx.drawImage(img, x, y, width, height);
//         };
//         img.src = currentSignature;
//       });
//     }

//     return canvas.toDataURL("image/png");
//   };

//   const handleDownload = () => {
//     if (!selectedDoc || !currentSignature) {
//       alert("Please create a signature first!");
//       return;
//     }

//     try {
//       const signedDocumentData = createSignedDocument();

//       // Create download link
//       const link = document.createElement("a");
//       link.download = `signed_${selectedDoc.name.replace(/\.[^/.]+$/, "")}.png`;
//       link.href = signedDocumentData;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);

//       alert("Signed document downloaded successfully!");
//     } catch (error) {
//       console.error("Download error:", error);
//       alert("Error downloading document. Please try again.");
//     }
//   };

//   const handleSend = () => {
//     if (!currentSignature) {
//       alert("Please create a signature first!");
//       return;
//     }

//     if (signatureFields.length === 0) {
//       alert("Please add signature fields to the document first!");
//       return;
//     }

//     alert(
//       `Documents sent successfully to ${recipients.length} recipient(s)! All recipients will receive email notifications.`
//     );
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-gray-900 mb-6">
//         Sign Your Documents
//       </h2>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Signature Creation */}
//         <div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">
//             Create Your Signature
//           </h3>

//           <SignatureCanvas
//             canvasRef={canvasRef}
//             currentSignature={currentSignature}
//             setCurrentSignature={setCurrentSignature}
//           />

//           <DocumentSummary
//             documents={documents}
//             recipients={recipients}
//             signatureFields={signatureFields}
//           />

//           {/* Signature Status */}
//           <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
//             <div className="flex items-center space-x-2">
//               {currentSignature ? (
//                 <>
//                   <Check className="w-4 h-4 text-green-600" />
//                   <span className="text-sm text-green-700 font-medium">
//                     Signature Created
//                   </span>
//                 </>
//               ) : (
//                 <>
//                   <Edit3 className="w-4 h-4 text-blue-600" />
//                   <span className="text-sm text-blue-700 font-medium">
//                     Draw your signature above
//                   </span>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Preview */}
//         <div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>

//           <SignPreview
//             selectedDoc={selectedDoc}
//             signatureFields={signatureFields}
//             currentSignature={currentSignature}
//           />

//           <div className="mt-6 space-y-3">
//             <button
//               onClick={handleSend}
//               disabled={!currentSignature}
//               className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
//             >
//               Send for Signatures
//             </button>

//             <button
//               onClick={handleDownload}
//               disabled={!currentSignature}
//               className="w-full px-6 py-3 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
//             >
//               <Download className="w-4 h-4 inline mr-2" />
//               Download Signed Copy
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-between mt-8">
//         <button
//           onClick={onBack}
//           className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//         >
//           Back
//         </button>
//       </div>
//     </div>
//   );
// };

// // Features Section Component
// const FeaturesSection: React.FC = () => (
//   <div className="max-w-7xl mx-auto px-4 py-12">
//     <div className="text-center mb-12">
//       <h2 className="text-3xl font-bold text-gray-900 mb-4">
//         Why Choose SignFlow?
//       </h2>
//       <p className="text-lg text-gray-600">
//         Built for speed, security, and simplicity
//       </p>
//     </div>

//     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//       <FeatureCard
//         icon={Upload}
//         iconColor="text-blue-600"
//         bgColor="bg-blue-100"
//         title="Lightning Fast Upload"
//         description="Drag & drop multiple documents instantly. No waiting, no complex menus."
//       />
//       <FeatureCard
//         icon={MousePointer}
//         iconColor="text-green-600"
//         bgColor="bg-green-100"
//         title="One-Click Placement"
//         description="Place signature fields exactly where you need them with a single click."
//       />
//       <FeatureCard
//         icon={Send}
//         iconColor="text-purple-600"
//         bgColor="bg-purple-100"
//         title="Smart Delivery"
//         description="Automatic reminders and real-time tracking. Everyone stays in the loop."
//       />
//     </div>
//   </div>
// );

// // Feature Card Component
// interface FeatureCardProps {
//   icon: React.ComponentType<any>;
//   iconColor: string;
//   bgColor: string;
//   title: string;
//   description: string;
// }

// const FeatureCard: React.FC<FeatureCardProps> = ({
//   icon: Icon,
//   iconColor,
//   bgColor,
//   title,
//   description,
// }) => (
//   <div className="text-center p-6 bg-white rounded-xl shadow-sm">
//     <div
//       className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center mx-auto mb-4`}
//     >
//       <Icon className={`w-6 h-6 ${iconColor}`} />
//     </div>
//     <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
//     <p className="text-gray-600">{description}</p>
//   </div>
// );

// // Main App Component
// const SignFlow: React.FC = () => {
//   const [currentStep, setCurrentStep] = useState<StepId>("upload");
//   const [documents, setDocuments] = useState<Document[]>([]);
//   const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
//   const [recipients, setRecipients] = useState<Recipient[]>([
//     {
//       email: "",
//       role: "signer",
//       color: "bg-blue-500",
//     },
//   ]);
//   const [signatureFields, setSignatureFields] = useState<SignatureField[]>([]);
//   const [currentSignature, setCurrentSignature] = useState<string>("");

//   const steps: Step[] = [
//     { id: "upload", title: "Upload Documents", icon: Upload },
//     { id: "recipients", title: "Add Recipients", icon: Users },
//     { id: "prepare", title: "Prepare Document", icon: Edit3 },
//     { id: "sign", title: "Sign & Send", icon: Send },
//   ];

//   const renderStepContent = (): React.ReactNode => {
//     switch (currentStep) {
//       case "upload":
//         return (
//           <DocumentUpload
//             documents={documents}
//             setDocuments={setDocuments}
//             onNext={() => setCurrentStep("recipients")}
//           />
//         );
//       case "recipients":
//         return (
//           <RecipientsManager
//             recipients={recipients}
//             setRecipients={setRecipients}
//             onBack={() => setCurrentStep("upload")}
//             onNext={() => {
//               // Auto-select first document if none selected
//               if (!selectedDoc && documents.length > 0) {
//                 setSelectedDoc(documents[0]);
//               }
//               setCurrentStep("prepare");
//             }}
//           />
//         );
//       case "prepare":
//         return (
//           <DocumentPreparation
//             documents={documents}
//             selectedDoc={selectedDoc}
//             setSelectedDoc={setSelectedDoc}
//             recipients={recipients}
//             signatureFields={signatureFields}
//             setSignatureFields={setSignatureFields}
//             onBack={() => setCurrentStep("recipients")}
//             onNext={() => {
//               // Ensure we have a selected document for signing
//               if (!selectedDoc && documents.length > 0) {
//                 setSelectedDoc(documents[0]);
//               }
//               setCurrentStep("sign");
//             }}
//           />
//         );
//       case "sign":
//         return (
//           <SigningStep
//             documents={documents}
//             recipients={recipients}
//             signatureFields={signatureFields}
//             selectedDoc={selectedDoc || documents[0] || null}
//             currentSignature={currentSignature}
//             setCurrentSignature={setCurrentSignature}
//             onBack={() => setCurrentStep("prepare")}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       <Header />

//       {/* Progress Steps */}
//       <div className="max-w-4xl mx-auto px-4 py-6">
//         <ProgressSteps currentStep={currentStep} steps={steps} />

//         {/* Step Content */}
//         <div className="bg-white rounded-xl shadow-lg p-6">
//           {renderStepContent()}
//         </div>
//       </div>

//       <FeaturesSection />
//     </div>
//   );
// };

// export default SignFlow;

// import React, { useState } from "react";

// type Step = { id: number; label: string };

// const steps: Step[] = [
//   { id: 1, label: "Upload PDF" },
//   { id: 2, label: "Draw Signature" },
//   { id: 3, label: "Place Signature" },
//   { id: 4, label: "Download" },
// ];

// export default function ProgressStepsControlled() {
//   const [activeStep, setActiveStep] = useState(1);

//   return (
//     <div className="flex flex-col items-center space-y-4">
//       <div className="flex space-x-4">
//         {steps.map((step) => (
//           <div
//             key={step.id}
//             className={`px-4 py-2 rounded-full ${
//               step.id <= activeStep ? "bg-blue-500 text-white" : "bg-gray-200"
//             }`}
//           >
//             {step.label}
//           </div>
//         ))}
//       </div>

//       <button
//         onClick={() =>
//           setActiveStep((prev) => (prev < steps.length ? prev + 1 : prev))
//         }
//         className="px-4 py-2 bg-green-500 text-white rounded-lg"
//       >
//         Next
//       </button>
//     </div>
//   );
// }

// import React from "react";

// type Step = { id: number; label: string };

// type ProgressStepsProps = {
//   steps: Step[];
//   activeStep: number;
// };

// const ProgressSteps: React.FC<ProgressStepsProps> = ({ steps, activeStep }) => {
//   return (
//     <div className="flex space-x-4">
//       {steps.map((step) => (
//         <div
//           key={step.id}
//           className={`flex items-center space-x-2 ${
//             step.id <= activeStep ? "text-blue-600" : "text-gray-400"
//           }`}
//         >
//           <div
//             className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${
//               step.id <= activeStep ? "border-blue-600" : "border-gray-400"
//             }`}
//           >
//             {step.id}
//           </div>
//           <span>{step.label}</span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default function ProgressStepsReusable() {
//   const [active, setActive] = React.useState(1);

//   return (
//     <div className="flex flex-col items-center space-y-6">
//       <ProgressSteps steps={steps} activeStep={active} />
//       <button
//         onClick={() =>
//           setActive((prev) => (prev < steps.length ? prev + 1 : prev))
//         }
//         className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//       >
//         Next Step
//       </button>

//       <button
//         onClick={() =>
//           setActive((prev) => (prev < steps.length ? prev + 1 : prev))
//         }
//         className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//       >
//         Next
//       </button>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { motion } from "framer-motion";

// type Step = { id: number; label: string };

// const steps: Step[] = [
//   { id: 1, label: "Upload PDF" },
//   { id: 2, label: "Draw Signature" },
//   { id: 3, label: "Place Signature" },
//   { id: 4, label: "Download" },
// ];

// export default function AnimatedProgressSteps() {
//   const [active, setActive] = useState(1);

//   return (
//     <div className="flex flex-col items-center space-y-6">
//       <div className="flex items-center">
//         {steps.map((step, index) => (
//           <React.Fragment key={step.id}>
//             {/* Step */}
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0.5 }}
//               animate={{
//                 scale: step.id === active ? 1.2 : 1,
//                 opacity: step.id <= active ? 1 : 0.5,
//               }}
//               transition={{ duration: 0.3 }}
//               className="flex flex-col items-center"
//             >
//               <motion.div
//                 className={`w-10 h-10 flex items-center justify-center rounded-full font-bold ${
//                   step.id <= active
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-200 text-gray-500"
//                 }`}
//               >
//                 {step.id}
//               </motion.div>
//               <span className="text-sm mt-2">{step.label}</span>
//             </motion.div>

//             {/* Connector line */}
//             {index < steps.length - 1 && (
//               <motion.div
//                 className="h-1 w-12 mx-2 rounded"
//                 initial={{ backgroundColor: "#e5e7eb" }} // gray-200
//                 animate={{
//                   backgroundColor: step.id < active ? "#3b82f6" : "#e5e7eb", // blue-500
//                 }}
//                 transition={{ duration: 0.3 }}
//               />
//             )}
//           </React.Fragment>
//         ))}
//       </div>

//       <button
//         onClick={() =>
//           setActive((prev) => (prev < steps.length ? prev + 1 : prev))
//         }
//         className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
//       >
//         Next
//       </button>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { motion } from "framer-motion";

// type Step = { id: number; label: string };

// const steps: Step[] = [
//   { id: 1, label: "Upload PDF" },
//   { id: 2, label: "Draw Signature" },
//   { id: 3, label: "Place Signature" },
//   { id: 4, label: "Download" },
// ];

// export default function ConnectedProgressSteps() {
//   const [active, setActive] = useState(1);

//   return (
//     <div className="flex flex-col items-center space-y-6">
//       {/* Steps + connectors */}
//       <div className="flex items-center relative w-full max-w-3xl">
//         {steps.map((step, index) => (
//           <React.Fragment key={step.id}>
//             {/* Step Circle */}
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0.5 }}
//               animate={{
//                 scale: step.id === active ? 1.2 : 1,
//                 opacity: step.id <= active ? 1 : 0.5,
//               }}
//               transition={{ duration: 0.3 }}
//               className="flex flex-col items-center relative z-10"
//             >
//               <div
//                 className={`w-12 h-12 flex items-center justify-center rounded-full font-bold text-lg ${
//                   step.id <= active
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-200 text-gray-500"
//                 }`}
//               >
//                 {step.id}
//               </div>
//               <span className="text-sm mt-2">{step.label}</span>
//             </motion.div>

//             {/* Connector Line */}
//             {index < steps.length - 1 && (
//               <motion.div
//                 className="h-1 flex-1 mx-2 rounded-full "
//                 initial={{ scaleX: 0, originX: 0 }}
//                 animate={{
//                   scaleX: step.id < active ? 1 : 0, // show only completed ones
//                   backgroundColor: "#3b82f6", // blue-500
//                 }}
//                 transition={{ duration: 0.4 }}
//               />
//             )}
//           </React.Fragment>
//         ))}
//       </div>

//       {/* Next Button */}
//       <button
//         onClick={() =>
//           setActive((prev) => (prev < steps.length ? prev + 1 : prev))
//         }
//         className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
//       >
//         Next
//       </button>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { motion } from "framer-motion";

// type Step = { id: number; label: string };

// const steps: Step[] = [
//   { id: 1, label: "Upload PDF" },
//   { id: 2, label: "Draw Signature" },
//   { id: 3, label: "Place Signature" },
//   { id: 4, label: "Download" },
// ];

// export default function ModernProgressSteps() {
//   const [active, setActive] = useState<number>(1);

//   return (
//     <div className="flex flex-col items-center space-y-10 w-full max-w-4xl mx-auto py-10">
//       {/* Progress bar container */}
//       <div className="relative flex items-center justify-between w-full">
//         {/* Background line */}
//         {/* <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 rounded-full -translate-y-1/2 z-0" /> */}

//         {/* Animated progress line */}
//         <motion.div
//           className="absolute top-6 left-10 h-1 w-[90%] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full -translate-y-1/2 z-0"
//           initial={{ width: 1 }}
//           animate={{ width: `${((active - 1) / (steps.length - 1)) * 90}%` }}
//           transition={{ duration: 0.6, ease: "easeInOut" }}
//         />

//         {/* Steps */}

//         {steps.map((step) => {
//           const isActive = step.id === active;
//           const isCompleted = step.id < active;

//           return (
//             <div
//               key={step.id}
//               className="relative z-10 flex flex-col items-center"
//             >
//               {/* Animated Circle */}
//               <motion.div
//                 className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg ${
//                   // isCompleted
//                   //   ? "bg-gradient-to-r from-blue-500 to-purple-500"
//                   //   :
//                   isActive
//                     ? "bg-green-500 duration-300 delay-500"
//                     : isCompleted
//                       ? "bg-gradient-to-r from-blue-500 to-purple-500"
//                       : "bg-gray-300 text-gray-600"
//                 }`}
//                 animate={
//                   isActive
//                     ? {
//                         scale: [1, 1.2, 1],
//                         boxShadow: "0px 0px 12px rgba(59,130,246,0.6)",
//                       }
//                     : { scale: 1, boxShadow: "0px 0px 0px rgba(0,0,0,0)" }
//                 }
//                 transition={
//                   isActive
//                     ? { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
//                     : { duration: 0.3 }
//                 }
//               >
//                 {step.id}
//               </motion.div>

//               {/* Label */}
//               <span
//                 className={` text-sm font-medium ${
//                   isCompleted || isActive
//                     ? "text-green-500 delay-500"
//                     : "text-gray-400"
//                 }`}
//               >
//                 {step.label}
//               </span>
//             </div>
//           );
//         })}
//       </div>

//       <div className="flex items-stretch w-full mx">
//         {steps.map((s, i) => {
//           const isActive = s.id === active;
//           const isCompleted = s.id < active;

//           return (
//             <span
//               key={i}
//               className={` text-lg font-medium h-16 flex items-center justify-center w-full max-w-4xl bg-amber-50 ${
//                 isCompleted || isActive ? "text-blue-900" : "text-gray-400"
//               }`}
//             >
//               {s.label}
//             </span>
//           );
//         })}
//       </div>

//       {/* Next Button */}
//       <button
//         onClick={() =>
//           setActive((prev) => (prev < steps.length ? prev + 1 : prev))
//         }
//         className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-md hover:opacity-90 transition"
//       >
//         Next
//       </button>
//     </div>
//   );
// }

import React, { useState } from "react";
import { motion } from "framer-motion";
import StepCircle from "./StepCircle";

type Step = { id: number; label: string };

const steps: Step[] = [
  { id: 1, label: "Upload PDF" },
  { id: 2, label: "Draw Signature" },
  { id: 3, label: "Place Signature" },
  { id: 4, label: "Download" },
];

export default function ModernProgressSteps() {
  const [active, setActive] = useState(1);

  return (
    <div className="flex flex-col items-center space-y-10 w-full max-w-4xl mx-auto py-10">
      {/* Progress bar container */}
      <div className="relative flex items-center justify-between w-full">
        {/* Background line */}
        <div className="absolute top-6 left-10 w-[90%] h-1 bg-gray-200 rounded-full -translate-y-1/2 z-0" />

        {/* Animated progress line */}
        <motion.div
          className="absolute top-6 left-10 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full -translate-y-1/2 z-0"
          initial={{ width: 0 }}
          animate={{ width: `${((active - 1) / (steps.length - 1)) * 90}%` }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />

        {/* Steps */}
        {steps.map((step) => {
          const isActive = step.id === active;
          const isCompleted = step.id < active;

          return (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center"
            >
              {/* Animated Circle */}
              <StepCircle
                isActive={isActive}
                isCompleted={isCompleted}
                stepId={step.id}
              />

              {/* Label */}
              <span
                className={`mt-3 text-sm font-medium ${
                  isCompleted || isActive
                    ? "text-green-600 delay-700"
                    : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() =>
          setActive((prev) => (prev < steps.length ? prev + 1 : prev))
        }
        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-md hover:opacity-90 transition"
      >
        Next
      </button>
    </div>
  );
}
