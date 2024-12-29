import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
const pdfUrl="https://moonlit-fly-258.convex.cloud/api/storage/9a461012-541d-4889-b83b-b0a52e558a80"
export async function GET(req){
    //1. Load the PDF from the URL
    const response=await fetch(pdfUrl);
    const data=await response.blob();
    const loader=new WebPDFLoader(data);
    const docs=await loader.load();
    let pdfTextContent="";
    docs.forEach(doc=>{
        pdfTextContent+=doc.pageContent;
    });
    // 2. splitting text into smaller chunks
    const splitter=new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap:20
    });
    const output=await splitter.createDocuments([pdfTextContent]);
    let splitterList=[];
    output.forEach(doc=>{
        splitterList.push(doc.pageContent);
    });
   return NextResponse.json({result:splitterList});
}