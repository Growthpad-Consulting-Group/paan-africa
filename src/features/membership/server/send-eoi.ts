import { reply } from '@/shared/lib/server/http';
import { errorMessage } from '@/shared/lib/errors';
import nodemailer from "nodemailer";
import fs from 'fs';
import os from 'os';
import { parseMultipart } from '@/shared/lib/server/multipart';
import { uploadFileToDrive } from "@/features/membership/lib/googleDrive";
import { createClient } from '@supabase/supabase-js';

export async function sendEoi(request: Request): Promise<Response> {
  console.log('EOI API endpoint called - Method:', request.method);

  try {
    console.log('Starting form parsing...');
    const { fields: formFields, files: formFiles } = await parseMultipart(request, {
      maxFileSize: 10 * 1024 * 1024, // 10MB
      maxFiles: 10,
    });
    console.log('Form parsed successfully');

    // Helper to normalize field values
    function getFieldValue(field: any) {
      return Array.isArray(field) ? field[0] : field;
    }
    // Extract form fields
    const name = getFieldValue(formFields.name) || '';
    const email = getFieldValue(formFields.email) || '';
    const agencyName = getFieldValue(formFields.agencyName) || '';
    const country = getFieldValue(formFields.country) || '';
    const opportunities = getFieldValue(formFields.opportunities) || '[]';
    const credentials = getFieldValue(formFields.credentials) || '';

    // Prepare files for base64 storage
    const credentialsFiles = Array.isArray(formFiles.credentialsFiles)
      ? formFiles.credentialsFiles
      : formFiles.credentialsFiles
      ? [formFiles.credentialsFiles]
      : [];
    const experienceFiles = Array.isArray(formFiles.experience)
      ? formFiles.experience
      : formFiles.experience
      ? [formFiles.experience]
      : [];

    // Store file metadata and base64
    const credentialsFilesBase64 = credentialsFiles.map((file: any) => {
      const fileBuffer = fs.readFileSync(file.filepath);
      return {
        originalFilename: file.originalFilename,
        mimetype: file.mimetype,
        size: file.size,
        base64: fileBuffer.toString('base64'),
      };
    });
    const experienceFilesBase64 = experienceFiles.map((file: any) => {
      const fileBuffer = fs.readFileSync(file.filepath);
      return {
        originalFilename: file.originalFilename,
        mimetype: file.mimetype,
        size: file.size,
        base64: fileBuffer.toString('base64'),
      };
    });

    // Clean up temp files
    for (const file of [...credentialsFiles, ...experienceFiles]) {
      try {
        fs.unlinkSync(file.filepath);
      } catch (err) {
        console.error('Failed to delete temp file:', file.filepath, err);
      }
    }

    // Insert into Supabase
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );
    const { error } = await supabase.from('eoi_submissions').insert({
      name,
      email,
      agency_name: agencyName,
      country,
      opportunities: typeof opportunities === 'string' ? JSON.parse(opportunities) : opportunities,
      credentials,
      credentials_files_base64: credentialsFilesBase64,
      experience_files_base64: experienceFilesBase64,
      status: 'pending_email',
      created_at: new Date().toISOString(),
      processed_at: null,
      error_message: null
    });
    if (error) {
      console.error('Error inserting EOI submission:', error);
      return reply({ message: 'Failed to save submission', error: error.message }, 500);
    }
    return reply({ message: 'Your submission was received and will be processed shortly.' });
  } catch (error) {
    console.error('Error processing EOI submission:', error);
    return reply({ message: 'Error processing form', error: errorMessage(error) }, 500);
  }
} 