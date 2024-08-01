FROM python:3.9

WORKDIR /code

# Copy the requirements file
COPY ./requirements.txt /code/requirements.txt

# Install dependencies
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Add a non-root user
RUN useradd -m -u 1000 user

# Create the 'images' directory
RUN mkdir /code/images && chown user:user /code/images

# Switch to the non-root user
USER user

# Copy all necessary files and directories
COPY --chown=user:user . /code

# Set the command to run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]