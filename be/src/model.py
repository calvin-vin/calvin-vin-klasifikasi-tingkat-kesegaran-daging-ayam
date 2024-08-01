from torch import nn
from torchvision.models import mobilenet_v3_large, MobileNet_V3_Large_Weights

class CustomMobilenetV3(nn.Module):
    def __init__(self, output_size):
        super().__init__()
        self.mnet = mobilenet_v3_large(weights=MobileNet_V3_Large_Weights.DEFAULT)
        self.freeze()
        self.mnet.classifier = nn.Sequential(
            nn.Linear(960, output_size),
            nn.LogSoftmax(dim=1)
        )

    def forward(self, x):
        return self.mnet(x)

    def freeze(self):
        for param in self.mnet.parameters():
            param.requires_grad = False

    def unfreeze(self):
        for param in self.mnet.parameters():
            param.requires_grad = True